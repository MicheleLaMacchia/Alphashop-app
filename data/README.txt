user admin: root
password: root
-----------------
user1: WebClient
password: WebClient
db.createUser({
user:"WebClient",
pwd:"WebClient",
roles:[{role:"readWrite",db:"gestfid"}]
})