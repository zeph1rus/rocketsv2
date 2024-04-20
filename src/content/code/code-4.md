---
title: Dumb Code Post 4
language: "rust"
tags: ['rust']
date: 2024-03-11
description: Code RUST RUST RUST
---
# I am a rust
## I am a really useful rust

I'm some text I think

```rust
pub fn find_db(path: &str) -> Result<String, NotFoundError> {
    println!("Searching for notifications database");
    for entry in WalkDir::new(path) {
        match entry {
            Ok(path) => {
                let path_str = String::from(path.clone().into_path().to_str().unwrap());
                let path_fn = String::from(path.clone().file_name().to_string_lossy());

                if path_str.contains("com.apple.notification") {
                    match path_fn.as_str() {
                        "db" => {
                            println!("Possible Notifications DB Found: {:?}", path);
                            match do_i_own_the_file(path.clone().metadata().unwrap().st_uid()) {
                                true => {
                                    println!("Found Notifications DB (file is owned by current user)");
                                    return Ok(path_str);
                                }
                                false => {
                                    println!("Found a db but I don't own it, ignoring");
                                }
                            }
                        }
                        _ => {
                            // file is not named "db" so we're ignoring it
                        }
                    }
                }
            }
            Err(_) => {
                // we will get errors as we will hit paths we don't
                //have permissions to.  This is fine, as they say.
            }
        };
    }
    Err(NotFoundError)
}
```
