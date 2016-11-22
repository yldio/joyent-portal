GET /mem
GET /cpu

  cpu-node:
    build: .
    environment:
      - TYPE=node
    ports:
     - "8003:8000"
  cpu-artillery:
    build: .
    environment:
      - TYPE=artillery
      - MODE=cpu
    depends_on:
      - cpu-node
