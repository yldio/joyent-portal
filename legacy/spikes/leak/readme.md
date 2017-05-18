# leak

 - 1. Spawn a bunch of servers:
    - another-fast: a node with a linear memory leak
    - fast: a node with a linear memory leak
    - slow: a node with a memory leak that grows very slowly
    - plain: a node with no memory leak 
 - 2. Spawn an [artillery](https://artillery.io) for each node that loads it with a small but constant stream of requests
 - 3. Spawn Prometheus that watches the cpu/memory of each node

Then, locally we start the same server and we can see the different instances and an aggregate of the metrics for each job.

## usage

```
λ docker-compose up
λ node .
```

Go to http://127.0.0.1:8000/ and see the result.
The [Prometheus](https://prometheus.io) is also listening at http://127.0.0.1:9090/

## example

![](https://cldup.com/yxS380e1HN.png)
