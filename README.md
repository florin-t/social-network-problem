# social-network-problem

# run the server locally
npm start
# run unit tests
npm test

# example of rest calls 
curl -XGET "http://localhost:3000/chain-of-users?startUser=u11&endUser=u32"
curl -XGET "http://localhost:3000/chain-of-users?startUser=u01&endUser=u01"
curl -XGET "http://localhost:3000/chain-of-users?startUser=u01&endUser=u02"
curl -XGET "http://localhost:3000/chain-of-users?startUser=u11&endUser=u38"
curl -XGET "http://localhost:3000/chain-of-users?startUser=u11&endUser=u310"
curl -XGET "http://localhost:3000/chain-of-users?startUser=u11&endUser222=u32"
