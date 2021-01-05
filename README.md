## Important: Before downloading and using this directory structure, please read the following article:

[https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md)

## According to this article, the directory structure like this project is bad, consider it before using it and refer to it.

The other version follow the structure in the article: [here](https://github.com/onepiecehung/typescript-nodejs-v2) :smile:

# Disclaimer of all responsibility related to this project.

# Typescript with Node.js

## Powered by

[![DS112](https://i.imgur.com/iXgnqXG.png)](https://github.com/3Tea)

<img align="right" width="200" height="183" src="https://cloud.githubusercontent.com/assets/532272/21507867/3376e9fe-cc4a-11e6-9350-7ec4f680da36.gif">

# Introduction

## Status

![TravisCi](https://img.shields.io/travis/com/onepiecehung/typescript-nodejs/develop?style=for-the-badge&logo=travis-ci)
![CircleCI](https://img.shields.io/circleci/build/github/onepiecehung/typescript-nodejs/develop?logo=circleci&style=for-the-badge)
![Gitlab pipeline status](https://img.shields.io/gitlab/pipeline/onepiecehung/typescript-nodejs/develop?logo=gitlab&style=for-the-badge)
![Issues](https://img.shields.io/github/issues/onepiecehung/typescript-nodejs?style=for-the-badge&logo=github)
![Forks](https://img.shields.io/github/forks/onepiecehung/typescript-nodejs?style=for-the-badge&logo=github)
![Starts](https://img.shields.io/github/stars/onepiecehung/typescript-nodejs?style=for-the-badge&logo=github)
![License](https://img.shields.io/github/license/onepiecehung/typescript-nodejs?style=for-the-badge&logo=apache)
![Twitter](https://img.shields.io/twitter/url?style=for-the-badge&url=https%3A%2F%2Fgithub.com%2Fonepiecehung%2Ftypescript-nodejs&logo=twitter)

## Cross-platform, JavaScript runtime environment

![NPM 7](https://img.shields.io/badge/Npm-7.0.x-brightgreen.svg?logo=npm&style=for-the-badge)
![Node 15](https://img.shields.io/badge/NodeJS-15.0.x-brightgreen.svg?logo=node.js&style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-4.4.x-brightgreen.svg?logo=webpack&style=for-the-badge)

## Language

![Typescript](https://img.shields.io/badge/Typescript-4.2.x.dev-brightgreen.svg?logo=typescript&style=for-the-badge)

## Database

![MongoDB 4](https://img.shields.io/badge/MongoDB-4.4.x-brightgreen.svg?logo=mongodb&style=for-the-badge)
![Cassandra](https://img.shields.io/badge/Cassandra-3.11.9-brightgreen.svg?logo=Apache-Cassandra&style=for-the-badge)

## Back end web application framework

![Express 4](https://img.shields.io/badge/ExpressJS-4.17.x-brightgreen.svg?logo=node.js&style=for-the-badge)

## Cache

![Redis 6](https://img.shields.io/badge/Redis-6.0.8-brightgreen.svg?logo=redis&style=for-the-badge)

## Message broker

![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.8.9.management.alpine-brightgreen.svg?logo=rabbitmq&style=for-the-badge)
![ErLang](https://img.shields.io/badge/ErLang-23.1.3-brightgreen.svg?logo=erlang&style=for-the-badge)

## OS-level virtualization

![Docker](https://img.shields.io/badge/Docker-19.03.13.build.4484c46d9d-brightgreen.svg?logo=docker&style=for-the-badge)
![Docker-compose](https://img.shields.io/badge/Docker_compose-3.8.x-brightgreen.svg?logo=docker&style=for-the-badge)

## Load balancing

![HAProxy](https://img.shields.io/badge/HAProxy-1.9.x-brightgreen.svg?logo=nginx&style=for-the-badge)

# 1.Quick install

## Install the environment

This application requires

-   RabbitMQ - [Normal installation](https://www.rabbitmq.com/)
-   Redis - [Normal installation](https://redis.io/)
-   MongoDB - [Normal installation](https://www.mongodb.com/)

### Install with Docker

-   RabbitMQ

```sh
$ docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3
```

-   Redis

```sh
$ docker run --name some-redis -d redis
```

-   MongoDB

```sh
$ docker run --name some-mongo -d mongo:tag
```

### Setup file `.env`

```env
NODE_ENV=production #When running on production

RABBIT_URL=your_url_rabbitmq
#https://www.npmjs.com/package/amqplib

REDIS_URL=your_url_redis
#https://www.npmjs.com/package/ioredis

DB_URL=your_url_mongodb
#example: mongodb://localhost:27017/test
#https://mongoosejs.com/

#Port application
PORT=8018
```

## Install package

```npm
npm install
```

## Run

```npm
npm run dev
```

<!-- 
**_Successfully deployed the application_**

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/OxLd05c.png">
</div> 
-->

# 2. Advanced install (refer)

## Cluster RabbitMQ - High Availability [_Readme_](https://www.rabbitmq.com/clustering.html)

#### **!Important** goto `./docker/rabbitmq-cluster`

Edit file `haproxy.cfg`, if you want

```
stats auth    user:pass
```

default: `stats auth ds112:ds112`

### Implement via Shell

```sh
$ sh install-cluster.sh
```

```sh
$ sh setup-cluster.sh
```

### Or Docker

Run the following commands one by one.

```sh
$ docker build -t HAProxy-server-rabbitmq .
$ docker-compose up
```

```sh
$ docker exec -ti rabbitmq-node-2 bash -c "rabbitmqctl stop_app"
$ docker exec -ti rabbitmq-node-2 bash -c "rabbitmqctl join_cluster rabbit@rabbitmq-node-1"
$ docker exec -ti rabbitmq-node-2 bash -c "rabbitmqctl start_app"

$ docker exec -ti rabbitmq-node-3 bash -c "rabbitmqctl stop_app"
$ docker exec -ti rabbitmq-node-3 bash -c "rabbitmqctl join_cluster rabbit@rabbitmq-node-1"
$ docker exec -ti rabbitmq-node-3 bash -c "rabbitmqctl start_app"

$ docker exec -ti rabbitmq-node-1 bash -c "rabbitmqctl cluster_status"
```

##### RabbitMQ: http://localhost:15672/

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/HPkeuiF.png">
</div>

##### HAProxy: http://localhost:8025/haproxy?stats (login with user/pass) default: ds112:ds112

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/KR96uNb.png">
</div>

## MongoDB and Kubernetes [_Readme_](https://www.mongodb.com/kubernetes)

Kubernetes is the industry-leading container orchestration platform. You can use any distribution of Kubernetes to manage the full lifecycle of your MongoDB clusters, wherever you choose to run them, from on-premises infrastructure to the public cloud.

### System

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/8YWQGMZ.png">
</div>

[see more](https://medium.com/@ManagedKube/deploy-a-mongodb-cluster-in-steps-9-using-docker-49205e231319)

### The mongodb cluster system architecture uses Kubernetes

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/5G3GQBV.jpg">
</div>

## Redis cluster [_Readme_](https://redis.io/topics/cluster-tutorial)

## Update...

# 3. Project structure

```
./src/
    /bin
    /config
    /connector
    /controllers
    /documents
    /interfaces
    /middleware
    /models
    /repository
    /routes
    /services
    /utils
    /validator
    /worker
```

### Simple Architecture

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/a3QOKej.png">
</div>

### The flow of application

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/i6CHHhQ.png">
</div>

<!--
# 4. Web Architecture

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/Z7fFPRb.png">
</div>

The above diagram is a fairly good representation of our architecture at [Storyblocks](https://www.storyblocks.com/). If you’re not an experienced web developer, you’ll likely find it complicated. The walk through below should make it more approachable before we dive into the details of each component.

##### You can see more information with [this link](https://engineering.videoblocks.com/web-architecture-101-a3224e126947) or see below:

#### 1. DNS

DNS stands for “Domain Name System” and it’s a backbone technology that makes the world wide web possible. At the most basic level DNS provides a key/value lookup from a domain name (e.g., google.com) to an IP address (e.g., 85.129.83.120), which is required in order for your computer to route a request to the appropriate server. Analogizing to phone numbers, the difference between a domain name and IP address is the difference between “call John Doe” and “call 201-867–5309.” Just like you needed a phone book to look up John’s number in the old days, you need DNS to look up the IP address for a domain. So you can think of DNS as the phone book for the internet.

There’s a lot more detail we could go into here but we’ll skip over it because it’s not critical for our 101-level intro.

#### 2. Load Balancer

Before diving into details on load balancing, we need to take a step back to discuss horizontal vs. vertical application scaling. What are they and what’s the difference? Very simply put in this [StackOverflow post](https://stackoverflow.com/questions/11707879/difference-between-scaling-horizontally-and-vertically-for-databases), horizontal scaling means that you scale by adding more machines into your pool of resources whereas “vertical” scaling means that you scale by adding more power (e.g., CPU, RAM) to an existing machine.
In web development, you (almost) always want to scale horizontally because, to keep it simple, stuff breaks. Servers crash randomly. Networks degrade. Entire data centers occasionally go offline. Having more than one server allows you to plan for outages so that your application continues running. In other words, your app is “fault tolerant.” Secondly, horizontal scaling allows you to minimally couple different parts of your application backend (web server, database, service X, etc.) by having each of them run on different servers. Lastly, you may reach a scale where it’s not possible to vertically scale any more. There is no computer in the world big enough to do all your app’s computations. Think Google’s search platform as a quintessential example though this applies to companies at much smaller scales. Storyblocks, for example, runs 150 to 400 AWS EC2 instances at any given point in time. It would be challenging to provide that entire compute power via vertical scaling.
Ok, back to load balancers. They’re the magic sauce that makes scaling horizontally possible. They route incoming requests to one of many application servers that are typically clones / mirror images of each other and send the response from the app server back to the client. Any one of them should process the request the same way so it’s just a matter of distributing the requests across the set of servers so none of them are overloaded.
That’s it. Conceptually load balancers are fairly straight forward. Under the hood there are certainly complications but no need to dive in for our 101 version.

#### 3. Web Application Servers

At a high level web application servers are relatively simple to describe. They execute the core business logic that handles a user’s request and sends back HTML to the user’s browser. To do their job, they typically communicate with a variety of backend infrastructure such as databases, caching layers, job queues, search services, other microservices, data/logging queues, and more. As mentioned above, you typically have at least two and often times many more, plugged into a load balancer in order to process user requests.
You should know that app server implementations require choosing a specific language (Node.js, Ruby, PHP, Scala, Java, C# .NET, etc.) and a web MVC framework for that language (Express for Node.js, Ruby on Rails, Play for Scala, Laravel for PHP, etc.). However, diving into the details of these languages and frameworks is beyond the scope of this article.

#### 4. Database Servers

Every modern web application leverages one or more databases to store information. Databases provide ways of defining your data structures, inserting new data, finding existing data, updating or deleting existing data, performing computations across the data, and more. In most cases the web app servers talk directly to one, as will the job servers. Additionally, each backend service may have it’s own database that’s isolated from the rest of the application.
While I’m avoiding a deep dive on particular technologies for each architecture component, I’d be doing you a disservice not to mention the next level of detail for databases: SQL and NoSQL.
SQL stands for “Structured Query Language” and was invented in the 1970s to provide a standard way of querying relational data sets that was accessible to a wide audience. SQL databases store data in tables that are linked together via common IDs, typically integers. Let’s walk through a simple example of storing historical address information for users. You might have two tables, users and user_addresses, linked together by the user’s id. See the image below for a simplistic version. The tables are linked because the user_id column in user_addresses is a “foreign key” to the id column in the users table.

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/hPPyWkp.png">
</div>

If you don’t know much about SQL, I highly recommend walking through a tutorial like you can find on Khan Academy [here](https://www.khanacademy.org/computing/computer-programming/sql). It’s ubiquitous in web development so you’ll at least want to know the basics in order to properly architect an application.
NoSQL, which stands for “Non-SQL”, is a newer set of database technologies that has emerged to handle the massive amounts of data that can be produced by large scale web applications (most variants of SQL don’t scale horizontally very well and can only scale vertically to a certain point). If you don’t know anything about NoSQL, I recommend starting with some high level introductions like these:

-   https://www.w3resource.com/mongodb/nosql.php
-   http://www.kdnuggets.com/2016/07/seven-steps-understanding-nosql-databases.html
-   https://resources.mongodb.com/getting-started-with-mongodb/back-to-basics-1-introduction-to-nosql

I would also keep in mind that, by and large, [the industry is aligning on SQL as an interface even for NoSQL databases](https://blog.timescale.com/blog/why-sql-beating-nosql-what-this-means-for-future-of-data-time-series-database-348b777b847a/)

<div style="text-align:center">
<img  width="100%" src="./public/image/nosql_sql.gif">
</div>
so you really should learn SQL if you don’t know it. There’s almost no way to avoid it these days.

#### 5. Caching Service

A caching service provides a simple key/value data store that makes it possible to save and lookup information in close to O(1) time. Applications typically leverage caching services to save the results of expensive computations so that it’s possible to retrieve the results from the cache instead of recomputing them the next time they’re needed. An application might cache results from a database query, calls to external services, HTML for a given URL, and many more. Here are some examples from real world applications:

-   Google caches search results for common search queries like “dog” or “Taylor Swift” rather than re-computing them each time
-   Facebook caches much of the data you see when you log in, such as post data, friends, etc. Read a detailed article on Facebook’s caching tech [here](https://medium.com/@shagun/scaling-memcache-at-facebook-1ba77d71c082).
-   Storyblocks caches the HTML output from server-side React rendering, search results, typeahead results, and more.

The two most widespread caching server technologies are Redis and Memcache. I’ll go into more detail here in another post.

#### 6. Job Queue & Servers

Most web applications need to do some work asynchronously behind the scenes that’s not directly associated with responding to a user’s request. For instance, Google needs to crawl and index the entire internet in order to return search results. It does not do this every time you search. Instead, it crawls the web asynchronously, updating the search indexes along the way.
While there are different architectures that enable asynchronous work to be done, the most ubiquitous is what I’ll call the “job queue” architecture. It consists of two components: a queue of “jobs” that need to be run and one or more job servers (often called “workers”) that run the jobs in the queue.

Job queues store a list of jobs that need to be run asynchronously. The simplest are first-in-first-out (FIFO) queues though most applications end up needing some sort of priority queuing system. Whenever the app needs a job to be run, either on some sort of regular schedule or as determined by user actions, it simply adds the appropriate job to the queue.
Storyblocks, for instance, leverages a job queue to power a lot of the behind-the-scenes work required to support our marketplaces. We run jobs to encode videos and photos, process CSVs for metadata tagging, aggregate user statistics, send password reset emails, and more. We started with a simple FIFO queue though we upgraded to a priority queue to ensure that time-sensitive operations like sending password reset emails were completed ASAP.

Job servers process jobs. They poll the job queue to determine if there’s work to do and if there is, they pop a job off the queue and execute it. The underlying languages and frameworks choices are as numerous as for web servers so I won’t dive into detail in this article.

#### 7. Full-text Search Service

Many if not most web apps support some sort of search feature where a user provides a text input (often called a “query”) and the app returns the most “relevant” results. The technology powering this functionality is typically referred to as [“full-text search”](https://en.wikipedia.org/wiki/Full-text_search), which leverages an [inverted index](https://en.wikipedia.org/wiki/Inverted_index) to quickly look up documents that contain the query keywords.

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/Pv2Rmxy.png">
</div>

###### _Example showing how three document titles are converted into an inverted index to facilitate fast lookup from a specific keyword to the documents with that keyword in the title. Note, common words such as “in”, “the”, “with”, etc. (called stop words), are typically not included in an inverted index._

While it’s possible to do full-text search directly from some databases (e.g., [MySQL supports full-text search](https://dev.mysql.com/doc/refman/5.7/en/fulltext-search.html)), it’s typical to run a separate “search service” that computes and stores the inverted index and provides a query interface. The most popular full-text search platform today is [Elasticsearch](https://www.elastic.co/elasticsearch/) though there are other options such as [Sphinx](http://sphinxsearch.com/) or [Apache Solr](https://lucene.apache.org/solr/features.html).

#### 8. Services

Once an app reaches a certain scale, there will likely be certain “services” that are carved out to run as separate applications. They’re not exposed to the external world but the app and other services interact with them. Storyblocks, for example, has several operational and planned services:

-   Account service stores user data across all our sites, which allows us to easily offer cross-sell opportunities and create a more unified user experience

-   Content service stores metadata for all of our video, audio, and image content. It also provides interfaces for downloading the content and viewing download history.

-   Payment service provides an interface for billing customer credit cards.

-   HTML → PDF service provides a simple interface that accepts HTML and returns a corresponding PDF document.

#### 9. Data

Today, companies live and die based on how well they harness data. Almost every app these days, once it reaches a certain scale, leverages a data pipeline to ensure that data can be collected, stored, and analyzed. A typical pipeline has three main stages:

[1] The app sends data, typically events about user interactions, to the data “firehose” which provides a streaming interface to ingest and process the data. Often times the raw data is transformed or augmented and passed to another firehose. AWS Kinesis and Kafka are the two most common technologies for this purpose.
[2] The raw data as well as the final transformed/augmented data are saved to cloud storage. AWS Kinesis provides a setting called “firehose” that makes saving the raw data to it’s cloud storage (S3) extremely easy to configure.
[3] The transformed/augmented data is often loaded into a data warehouse for analysis. We use AWS Redshift, as does a large and growing portion of the startup world, though larger companies will often use Oracle or other proprietary warehouse technologies. If the data sets are large enough, a Hadoop-like NoSQL MapReduce technology may be required for analysis.

Another step that’s not pictured in the architecture diagram: loading data from the app and services’ operational databases into the data warehouse. For example at Storyblocks we load our VideoBlocks, AudioBlocks, Storyblocks, account service, and contributor portal databases into Redshift every night. This provides our analysts a holistic dataset by co-locating the core business data alongside our user interaction event data.

#### 10. Cloud storage

“Cloud storage is a simple and scalable way to store, access, and share data over the Internet” [according to AWS](https://aws.amazon.com/what-is-cloud-storage/). You can use it to store and access more or less anything you’d store on a local file system with the benefits of being able to interact with it via a RESTful API over HTTP. Amazon’s S3 offering is by far the most popular cloud storage available today and the one we rely on extensively here at Storyblocks to store our video, photo, and audio assets, our CSS and Javascript, our user event data and much more.

#### 11. CDN

CDN stands for “Content Delivery Network” and the technology provides a way of serving assets such as static HTML, CSS, Javascript, and images over the web much faster than serving them from a single origin server. It works by distributing the content across many “edge” servers around the world so that users end up downloading assets from the “edge” servers instead of the origin server. For instance in the image below, a user in Spain requests a web page from a site with origin servers in NYC, but the static assets for the page are loaded from a CDN “edge” server in England, preventing many slow cross-Atlantic HTTP requests.

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/mroBc9p.png">
</div>

[Check out this article](https://www.creative-artworks.eu/why-use-a-content-delivery-network-cdn/) for a more thorough introduction. In general a web app should always use a CDN to serve CSS, Javascript, images, videos and any other assets. Some apps might also be able to leverage a CDN to serve static HTML pages.

#### Source: [videoblocks](https://engineering.videoblocks.com/web-architecture-101-a3224e126947)

<div style="text-align:center">
<img width="100%" src="https://i.imgur.com/SqseW24.png" ref="https://medium.com/@jonathan_fulton">
</div>

#### Oh...bruh...too long...

<!--
<div style="text-align:center">
<img src="https://i.imgur.com/qchz4Kc.gif">
</div> -->

#### Continue...

# 4. Wait...bruh...i forgot what to do next... :confused: :worried: :sleeping:

# Refer [Your wiki](https://github.com/onepiecehung/typescript-nodejs/wiki)
