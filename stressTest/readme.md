# Backend Stress Testing

## Config

Update server info in the config.js.


## Client

This subdirectory defines a client simulator intended to stress test the
backend service. It can be run with the following command:

    node client/

For run-time options, use the `-h` command-line flag.

A single instance can simulate any number of clients, although the most
realistic results will utilize more computers, each simulating a smaller number
of clients.

## Broadcast

Use following command to call api server:

    node broadcast.js

This will broadcast to all clients for the specific times.


