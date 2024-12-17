# OpenMirage
OpenMirage is a React application designed for visualisation of data from APIs and more. It's a modular system designed for developers to get a high level overview of what they're working on, so they're not constantly flicking between different terminals and windows.

**Due to the bare metal nature of OpenMirage, it's not recommended this is hosted in a way which makes it accessible for anyone else.** Treat it like you would a local testing database.

## Using
To start the app, run `npm start` from the project folder. Your browser window will open and load the app after a short while. To stop the app running, please use Ctrl+C to end the process.

## Adding functions
Functions are stored in the `server/requests.json` file.
```
{"head" : "curl {url} -S -I"}
```
The format takes advantage of the UNIX philosophy, that every program has one function and expects to be the output of another. If the command returns `0`, then the server will respond with the STDOUT. If the program responds with a non `0` code, the server will respond with the STDERR, and highlight the box in red to indicate an error.

All arguments are wrapped in `{}` to be parsed by the server. In the example above, `{url}` will be a field on the form the user can enter before making the request.

In the above example:
- `curl` invokes the curl program to make a request
- `{host}` is user input for which URL to make a request to
- `-s -S` instructs curl not to output any progress messages, but still to output any errors
- `-I` instructs curl to make a HEAD request

## Updating
Running NPM start will inform you when your app is out of date. To update your app, please run `git pull && npm install && npx react-scripts build` in the project folder.