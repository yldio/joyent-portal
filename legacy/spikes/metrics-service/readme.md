# metrics-service

> A service which produces random streams of data (firehose) of interpretable metric information for various subsystems that can or will be pulled out from a container. These are currently defined in [RFD-0037](https://github.com/joyent/rfd/blob/master/rfd/0037/README.md#default-metric-keys). 

This spike's purpose was to find the best pattern to expose such metrics service with mock data.

## http1

 + very simple API to push data from the server to the client
 + plain HTTP
 - requires a connection to each container - because it's not bidirectional, we can't subscribe to more containers on-demand

## http2

 + very simple API to push data from the server to the client
 + multiplexing
 - push doesn't really help us, because it's only useful for static resources
 
## graphql

 + common interface between all data resources
 + filter received data
 - api not finalised yet
 - api not documented

## ws (with [nes](https://github.com/hapijs/nes))

 + strong integration with [Hapi](https://github.com/hapijs/hapi)
 + allow to subscribe and unsubscribe on-demand on a single connection
 - some networks might require fallback to pooling
