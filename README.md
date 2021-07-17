# axie

serverless config credentials --provider aws --key XXX --secret YYY --profile ZZZ

aws dynamodb delete-table --table-name axie
aws dynamodb create-table --table-name axie --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH
