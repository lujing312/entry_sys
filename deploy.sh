#! /bin/bash -x

PROD_PROJECT_PATH='/application/apache-tomcat-8.0.53/webapps/ROOT'
BETA_PROJECT_PATH='/application/apache-tomcat-8.5.32/webapps/ROOT'

PROJECT_PATH=''

if [ $1 = 'prod' ]
then
  PROJECT_PATH=$PROD_PROJECT_PATH
elif [ $1 = 'beta' ]
then
  PROJECT_PATH=$BETA_PROJECT_PATH
else
  echo 'please input "bash deploy.sh beta" or "bash deploy.sh prod"'
  exit 0
fi

echo -e "\033[32m start deploy for $1 \033[0m"
echo -e '\033[32m refresh from git repository \033[0m'
git fetch
git pull

echo -e '\033[32m npm install dependency package and build \033[0m'
rm -rf node_modules
npm i --registry=https://registry.npm.taobao.org

echo -e "\033[32m npm run $1 \033[0m"
npm run $1

echo -e '\033[32m clean old build files \033[0m'
rm "$PROJECT_PATH/index.html"
echo -e '\n'
rm -rf "$PROJECT_PATH/static"

echo -e '\033[32m copy build files to server dir \033[0m'
cp -r ./dist/. $PROJECT_PATH

echo -e "\033[32m copy to $PROJECT_PATH success \033[0m\n" 
echo -e '\033[32m DEPLOY FINISH \033[0m'