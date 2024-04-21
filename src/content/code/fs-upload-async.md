---
title: F# Form File Upload Async
language: "f#"
tags: ['async','f#']
date: 2023-07-30
description: Uploading a file async to a form submit using System.Net.HttpClient in F#
---
Uploading a file async to a form submit using `System.Net.HttpClient` in F#
```fsharp

let createFileHttpContent (path:string):MultipartFormDataContent =
let file = System.IO.File.OpenRead(path)
let content = new MultipartFormDataContent()
let fileContent = new StreamContent(file)
fileContent.Headers.ContentType <- MediaTypeHeaderValue.Parse("multipart/form-data")
content.Add(fileContent, "file", path)
content

let uploadFile path =
    async {
        use fileContent = createFileHttpContent path
        use client = new HttpClient()
        try
            let! response = Async.AwaitTask(client.PostAsync(constructUrl, fileContent))
            printfn $"{path} - {response.StatusCode}"
            match response.StatusCode with
            | HttpStatusCode.OK -> printfn "Success"
            | _ -> ()
        with error -> printfn $"%s{error.Message}"
    }
```

 