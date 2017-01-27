FROM jfloff/alpine-python:3.4-slim
RUN /entrypoint.sh \
  -p sphinx \
  -p recommonmark \
  -p sphinx_rtd_theme \
  -a make \
&& echo

RUN mkdir -p /docs/
WORKDIR /docs/
COPY Makefile .
COPY source ./source/
RUN make html
WORKDIR /docs/build/html/
EXPOSE 8080
CMD ["python", "-m", "http.server", "8080"]
