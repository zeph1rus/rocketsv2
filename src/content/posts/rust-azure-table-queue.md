---
title: "Rust: Azure Table Queues"
tags: ["examples"]
date: 2024-03-21
description: Using rust to push messages into an azure storage queue (or any table api queue)
---

## Rust and Azure Table Queues

I put together an example of how to talk to azure storage table queues using Rust after experimenting with azure functions and Rust. The advantage of doing this in rust is that the startup times are really low from cold-starts for function apps (<1s consistently) which if it works for you can avoid you having to have permanently online functionapps.

There isn't an official SDK yet, so this is done just with REST.

The full code is at: [Github](https://github.com/zeph1rus/rust-azure-table-queue/tree/main)

### Constructing the Signature

This is probably the most annoying part of this process - most of this string isn't actually populated but you have to construct it accounting for the missing parts:

```rust
/// construct_signature makes the following signature string.
/// of note - only Content-Length is acutally parsed for queue service
/// Date is optional - but you have to provide x-ms-date in the signature and the request regardless
/// so it's basically not required.
///
/// StringToSign = VERB + "\n" +
///                Content-Encoding + "\n" +
///                Content-Language + "\n" +
///                Content-Length + "\n" +
///                Content-MD5 + "\n" +
///                Content-Type + "\n" +
///                Date + "\n" +
///                If-Modified-Since + "\n" +
///                If-Match + "\n" +
///                If-None-Match + "\n" +
///                If-Unmodified-Since + "\n" +
///                Range + "\n" +
///                CanonicalizedHeaders +
///                CanonicalizedResource;
fn construct_signature(content_length: usize, date_time: String) -> String {
    let mut auth_string = Vec::<String>::new();
    //verb
    auth_string.push(String::from("POST\n"));
    //content encoding
    auth_string.push(String::from("\n"));
    //content language
    auth_string.push(String::from("\n"));
    //content length. Must be nothing if 0
    match content_length {
        0 => auth_string.push(String::from("\n")),
        _ => auth_string.push(format!("{}\n", content_length))
    }
    // content-md5
    auth_string.push(String::from("\n"));
    //content-type (this _should_ be empty i think)
    auth_string.push(String::from("\n"));
    //Date
    auth_string.push(String::from("\n"));
    // if-modified
    auth_string.push(String::from("\n"));
    // if match
    auth_string.push(String::from("\n"));
    // if none match
    auth_string.push(String::from("\n"));
    // if unmodified since
    auth_string.push(String::from("\n"));
    // range
    auth_string.push(String::from("\n"));

    let canonicalised_headers = canonical_headers(date_time);
    auth_string.push(canonicalised_headers);
    auth_string.push(String::from("\n"));

    let canonicalised_resource = canonical_resource();
    auth_string.push(canonicalised_resource);

    auth_string.join("")
}
```

### The canonical resource string and the canonical headers

Canonical Headers are just concatenated header values - we don't need a lot of them so you can skip generating them automatically, however if you're doing other storage things you may need to do this programmatically. See the docs, unfortunately.

```rust
/// the canonicalized_headers string just contains all the header values pre-pended with 'x-ms-' stuffed in the signature
/// this is because they are matched with the values in the actual request.  For queues we only pass two so it's just a simple
/// format string.
/// if you have more headers the method in the unofficial azure rust sdk is going to be more sane:
/// https://github.com/Azure/azure-sdk-for-rust/blob/ddedf470b09c1b1ce8a7dc050aded67211b5519b/sdk/storage/src/authorization/authorization_policy.rs#L155
///
fn canonical_headers(date_time: String) -> String {
    // Time Format: "Sun, 02 Sep 2009 20:36:40 GMT"
    // this is RFC1123 "%a, %d %b %Y %H:%M:%S %Z"
    // https://docs.rs/chrono_parser/latest/chrono_parser/formats/constant.RFC1123.html
    format!("x-ms-date:{}\nx-ms-version:{}", date_time, X_MS_VERSION)
}
```

The canonical resource string is similar but for the resource url.  For queues this is simpler than for general storage.

```rust
/// construct the canonicalized_resource string according to the documentation at:
/// https://learn.microsoft.com/en-us/rest/api/storageservices/authorize-with-shared-key#constructing-the-canonicalized-resource-string
/// note: for queues you have to append the /messages endpoint despite the documentation not suggesting that at all.
fn canonical_resource() -> String {
    let mut cr_string = Vec::<String>::new();
    cr_string.push("/".to_string());
    cr_string.push(STORAGE_ACCOUNT_NAME.to_string());
    cr_string.push("/".to_string());
    cr_string.push(QUEUE_NAME.to_string());
    cr_string.push("/messages".to_string());
    cr_string.join("")
}
```

