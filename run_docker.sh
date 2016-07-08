docker run -it --rm -p 4000:4000 --name node-simple-test --link nodeseed_db_1:db --net nodeseed_default colbyjax/node-api-simple:v2
