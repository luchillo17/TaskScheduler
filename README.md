# The Task Scheduler

This project provides a way to automate tasks using a `cron` like syntax, combine `SubTasks` to execute more complex tasks, and it's cross-platform compatible with anything Electron can be packaged to.

## Installation

This project uses `yarn` instead of `npm`, for that reason you'll see a `yarn.lock` file, if you wish to use npm and run into trouble, take a look at the `yarn.lock` file to lock your dependencies with `npm`.

However if you don't need to add functionality, just check the release files for a compiled version for your OS environment.

## Quick start

The `package.json` file contains multiple scripts, in development you should first build the electron main bundle, then start the `webpack-dev-server` for the app, to do so use the command `npm run start`.

## Introduction

In this project there are 3 main concepts, folders, tasks and subtasks:
* Folder: It's just an organizational model, basically it only works as a way to `tag` or `group` some `Tasks`.
* Task: A `Task` represents the task you want to execute, more specifically the header of such, which defines it's name, some flags & configs like `Active`, `Email notification`, `Date range`, and the actual `cron` config for recurrence rule for this tasks.
* SubTask: A `Task` is composed of multiple `SubTasks`, while the `Task` defines the name and recurrence rule that dictates when the task is executed, `SubTasks` defines what the task does, for example, a task to connect 2 APIs by making a GET request to API1, transform the result & send a POST request to API2 will have at least 3 `SubTasks`, 1 API task for the GET request, 1 JSON task to transform the json response into the data structure or schema required by API2, and the last one will be an API task for the POST request to API2 using the data result from the JSON `SubTask`.

## Available SubTasks

Current support for SubTasks are listed below:
* Log SubTask: The most simple one, it will log text or even data from previous tasks into the development console.
* API SubTask: Allow to make Authenticated (or non authenticated) requests to urls, currently supported verbs are `GET` and `POST`.
* JSON SubTask: Allow to grab a JSON object, transform it to another structure defined by a format schema. (The schema has it's own DSL, the `MapFormat`, `FilterChild` & `MapChild` interfaces should help you create a valid format, look at `src/custom-typings.d.ts` file).
* JSON-XML SubTask: Dealing with SOAP or just XML APIs?, then this task is for you, it turns JSON objects to XML strings as defined by the schema of the `xml-js` package (specifically the schema required by the `compact: true` flag).
* ScheduleDataTask: This `SubTask` pulls the parent `Task` data into the workflow, my specific use case was to get the last time that `Task` was executed in order to limit some queries to the APIs, so it would only bring data updated since last successful execution.

## Todo

* [ ] Support i18n:
  * [X] ~~*Spanish*~~
  * [ ] English
* [X] ~~*Add base Angular 2 project and config.*~~
* [X] ~~*Add HMR for Angular 2.*~~
* [X] ~~*Add `@ngrx/store`.*~~
* [X] ~~*Add `Redux-DevTools` to Electron for debugging Redux state and history.*~~
* [X] ~~*Set persistence for store state, use observable to sync with localStore, and `beforeunload` event for window close or reloads.*~~
* [ ] Use `localForage` instead of `localStorage` for better compatibility and fallback support.
* [X] ~~*Add support for `primeng` widgets.*~~
* [X] ~~*Add support for `@angular/material` widgets. (Supported through shared folder but not even used).*~~
* [ ] Add support for `AgGrid` community version (maybe).
