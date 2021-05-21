# [UBUNTU 20.x] How to use it

# Setup

## 1. Install mongo-tool

https://docs.mongodb.com/database-tools/

```shell
sudo apt install mongo-tools
```

## 2. Install and Configuring AWS CLI

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

## 3. Run

```shell
bash backup.sh --db="database-name" --username="username-database" --password="password-database" --buckets3="bucket-name-s3"
```

## 4. Run with crontab

https://www.howtogeek.com/101288/how-to-schedule-tasks-on-linux-an-introduction-to-crontab-files
