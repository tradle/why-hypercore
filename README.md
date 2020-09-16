# Why Hypercore?

As we are exploring the design for running Tradle on Hypercore, this summarizes our findings.

## What is Hypercore?

If you do not find answers to your questions below. See an [extensive FAQ](FAQ.md) for more.

### Monopolies are not good

Web's Hub and spoke technical architecture is the reason we have now the monopolies with billions of users, the size of which we never seen before.
Billion dollar fines for them seem to be issued every year now, but this is not a solution.
We need a new P2P architecture and Hypercore is it.

### P2P tech is hard to create, but it is finally entering mainstream

P2P architectures and applications are much harder to create than centralized, they are often less efficient (Bittorrent's download super-speeds are an exception) and investors are less interested, as they do not produce monopolies that create outsized returns.

Yet, we live in the age of the rise of decentralized and P2P tech renaissance. Notable is the whole crypto space, which helped launch decetralized VPNs, like [Orchid](https://www.orchid.com/), decentralized live streaming like [Theta.tv](https://theta.tv), etc.

Some P2P technology is inherently very slow. Luckily Hypercore is designed for real-time, and works in time-sensitive video streaming and decentralized filesystems and database scenarious. 

## Why Tradle on Hypercore?

### We need a felxible foundation for Personal and SME Applications

We explored a plethora of systems for privacy-focused first-person data management. Most systems are focused on chasing AWS with Enterprsie-centric offerings. Existing solutions for Personal Cloud are focused just on data (mimicing Dropbox), not applications. Others, like NextCloud, are full blown packages of applications not cloud-native and not designed as a foundation for building new apps.

Our requirementds include Personal Cloud that will then evolve to SME Cloud. We have already built an Enterpise Cloud system for the banks (we call it MyCloud), so we know the higher end requirements quite well. Hypercore will give us manhy things we need, such as reliable messaging for our Transactional Messanger, data sharing for teams, will provide the Data Integrity we need for compliance, and Change Data Management for building search indexes, Data Lakes and to run ETL jobs.

What we have found in Hypercore is highly modularized and composable framework, with many standard APIs, and reusable abstractions that allow developers to plug in alternative implementations. Unlike any competing P2P framework, Hypercore's design allows for a much wider class of privacy-first applications, which is on our roadmap. 

Hypercore is also like a mozaic of hundreds of pieces. It is its strength but also its complexity. It is not easy to build on top of today, and this limits its potential. At Tradle we would hope to help higher-level developers with tools to build P2P apps really fast.

### What was the Initial Impulse?

Initial impulse for the design exploration of Hypercore has arrived from the Data Souvereignty demands we got from the banks and the governments for our open source Digital Identity product. Tradle server, called MyCloud, we had decetralization figured out, or so we thought. Tradle MyCloud is installed by its users under their own AWS account, so you end up with your own your Tradle istallation. It is serviced by Tradle support staff, but from the outside, without any access to your data or operations. We call it Private SaaS. 

We started Tradle with the notion that Credit Bureaus, and any other identity aggregators, are the systemic risk for our economy and personal safety. With Equifax disaster, which had detailed financial information of all working Americans stolen in one fell swoop, we now all know data aggregators are evole.

But Data Souvereignty became a new and powerful phenomena for us as AWS data centers are present in only 15 countries at the moment. Besides, in many countries storing sensitive data in the data center owned by a foreign operator is not permitted. And, interestingly, in Europe it is becoming a sore point too. It is not surprising, as Snowden's revelations showed, that whole population data, centralized in a small number of corporate hands, are so attractive for the governments. The temptation is just too great. And now there is also a [US Cloud Act](https://en.wikipedia.org/wiki/CLOUD_Act).

### Local Data Centers have lost to AWS and other Hyperscalers, so what is the Point?

In the past 10 years there were many failed attempts to create Open Source AWS alternatives.

The most massive effort was OpenStack. But AWS is a very fast moving target and simulating all that it does (160+ services and counting), became impossible. OpenStack was designed by Rackspace initially, but later adopted a multi-stakeholders committee process, which turned out to be very complex to manage and just plain too slow to chase AWS.

Luckily, in the past 10 years major components of Cloud's virtualization and networking have become part of the standard Linux kernel or have emerged as Open Source projects. This is KVM and Wireguard, FireCracker and Containers, S3-compatible storage like Min.io and scalable low-management databased like Facebook’s RocksDB and the CockroachDB, built on top of it, by former Google Spanner engineers.

Many other innovations are happening on the Edge of the network, outside of the AWS stronghold. This is Fly.io using FireCracker and Redis, CloudFlare with serverless workers and Key-Value store, Fastly serverless with blazingly fast WebAssembly.

**And finally, there is an under-appreciated gem of Hypercore.**

### Tradle on AWS can be modified for Hypercore

Luckily Tradle uses only a small subset of AWS services, and this makes the task manageable. Even better, [Tradle MyCloud](https://github.com/tradle/mycloud) already uses an emulation layer for AWS, called [Localstack](https://github.com/localstack/localstack). Localstack is sufficient to run and debug Tradle MyCloud but is inherently unreliable and is single-tenant.

![alt_text](images/image1.png "image_tooltip")

We need a solid base that can be deployed in any Local Data Center, removing our dependency on AWS. This document outlines the steps we can take by replacing one by one its components with the enterprise-grade production-ready components for multi-tenancy. 

## Assembling a modern Cloud stack on Hypercore

Matching vast aray of AWS services is a daunting task, and it is not our goal Cloud. We choose to focus on Simple Cloud foundation, sufficient to run a Personal Cloud. Communications, virtualization, networking and other aspects of the Cloud are described in [Simple Cloud](SimpleCloud.md) document, while here we focus on Hypercore, that can help address many aspects of data, sharing and communicatons. 

### What do we gain from Hypercore, at the high level?

#### Data Souvereignty

Ability to build private-first local-first offline-first data applications, with functionality and convenience similar to and surpassing the centralized, Google-style apps, while offering the incomparable data and acivities privacy, Data Locality, Residency and Sovereignty.

#### Data Continuum

Ability to build apps that work in the Cloud **and** on local PCs and mobiles. Many cloud-native systems only work in the Cloud, which limits their scope of use, and makes them extremely difficult for developers to debug and test, leading to a huge loss in productivity. AWS is notoriously difficult in that respect.

### What makes Hypercore suitable for Tradle?

### Data Durability, Load balancing, and Mobility

#### Data Durabilty

Hypercore has built-in capabilities for data replicatiom. This can be used to replicate files and databases in-Data Center (DC) and inter-DC. This provides durability of data, with the resilience to hardware failures. 

#### Load Balancing

We can build load balancing, routing requests to another machine to perform computation on the desired data replica. It also adds to durability, as it allows scheduled and emergency hardware maintenance by forwarding traffic to other machines and Data Centers.

#### Mobility

It can help migration of data to allow users to move to another Data Center at will.

### Databases Durability, Load Balancing and Mobility

It is not enough to have file relaction. Replicating databases is much harder. Replication of databases provided by Hypercore but is ncan be used for durability, load balancing and mobility, but also for analytics applications that are performed on a replica, offloading the operational DB.

Hyperbee is compliant to Level API, which allows it to become a drop-in replacement for AWS DynamoDB, with a [Dynolite adapter](https://github.com/mhart/dynalite). This is simpler for personal use, while for teams, and for e-commerce we will need to explore additional Hypercore tech for streaming sort-merge, see below.

### Data Integrity, Digital Signatures and Compliance

Protects every data item from unauthorized modifications and assures that the old data is intact (Thus is similar to blockchain, where all transactions are added to a merkle tree and new blocks linked to old ones).

In Hypercore, the writer digitally signs any addition or change. Previous version of the data is kept and can be retrieved later. This creates a very nice audit trail.

Note that it still lacks secure timestamping and allows author to roll back to a previous verion and start again, without the peers that arrived after the fact noticing it. Both can be prevented with a blockchain-based binding (e.g. such as used by Tradle). 

This can further benefit from [qualified digital signatures](https://en.wikipedia.org/wiki/Qualified_digital_certificate) compliant to eIDAS in EU, equivalent US laws [E-Sign Act](http://www.gpo.gov/fdsys/pkg/PLAW-106publ229/content-detail.html) and [UETA](https://www.uniformlaws.org/committees/community-home?communitykey=2c04b76c-2b7d-4399-977e-d5876ba7e034&tab=groupdetails)), and other jurisdictions that accept digital signtatures in the court of law. This would also be critical for forensic investigations in regulated industries and for criminal investogations (This lack can be alleviated by Tradle with its finance-grade identity management and associated digital signatures to alleviate this).

### Uniformity 

Hypercore allows to discover peers in the network and connect to them to consistently and reliably exchnage all types of data. Hypercore uniquely works for messaging, files, huge media, IoT streams and databases. Uniquely, it allows to stream all those data, a notion that exiting for media but was not attempted before for databases.

### Recovery

Hypercore uniquely works for both files and databases. Provides point-in-time restore from any past versions of the data state. This simulates both the DynamoDB point-in-time backup / restore and S3 object versioning. This capability can also be used as snapshots, as it allows to checkout the store, tagged at a particular version. This may be used for devops and for development. It can also be used for in forensic investigations for regulated industries and in criminal investogations.

### Shared files and folders (like Dropbox or Google Drive)

Hyperdrive, one of Hypercore components provides the core capabilities. It allows to shared a drive with the family, friends and teams. To compete with Dropbox and Drive, it needs durability, typicaly assiciated with the Cloud. Inherent replication capability of Hypercore come handy as any sharing with peers increases the durability, but it is not enough. What is missing also is mobile and browser implementations and easy UI, permission system, notifications, etc.

### Shared document editing like Google Docs and Google Slides 

Because Hypercore is designed for immediacy of realtime data exchanges, it can be used for simultaneous editing. Its P2P nature allows it to work without a central site. What is also needed is intelligent document merge. There are two community projects that provide the missing capability. [YJS](https://github.com/yjs/yjs) and [Hypermerge](https://github.com/automerge/hypermerge). 

Like with the Hyperdrive, the remaining issue to be solved is the always-online nature of competing non-P2P services.

### Offline-first

All data is available when offline. Messages and media (of any size) are delivered from mobiles to server and back with full reliably, in view of intermittent connectivity.

### Group messaging

using publish / subscribe capability of Hypercore. 

### Direct media sharing

Supports large-size media. E.g. 150mb file can’t be shared on WhatsApp or Skype. Sharing between two users over the Internet, while bypassing the server (in most cases), makes it faster, cheaper, more secure, protecting other essential freedoms and more resilient against surveilance. 

There is still work to be done for making Hypercore more private, e.g. improve Hyperswarm to not reveal IP addresses when not on VPM, perhaps with the help of [I2P](https://geti2p.net/en/).

### Local file sharimg, liek Apple Airdrop

This is supported by local peer discovery (with the help of MDNS). Allows sharing on local network, without going to the internet. This is another privacy and security enhancing capability.

### Research data and DB sharing

Supports for super-large file sizes is important for scientific data sets. Support for bittorrent-stile download acceleration by downloading from multiple universities simultaneously is also a critical capability. Allows verifying integrity of chunks of data loaded in parallel from untrusted peers.

But let's not forget Hypercore's totally unique capability for Database streaming, which allows Petabyte-scale DB served remotely, without a database server. Hyperbee can be [shoved onto S3](https://github.com/random-access-storage/random-access-s3), or an equivalent store, and streamed without a worry, which is available in Hypercore [since 2017](https://blog.datproject.org/2017/05/24/upgrade-your-dat/).

Any Database Server can be accessed remotely and many can serve huge databases. But they need operational mamagement and have associated human resources costs. Such costs are detrimental for example to a new popular with developers class of Serverless applications.

### Live streaming

Hypercore enables live streaming as allows to upload video and for viewers to start downloading media, before the whole file is uploaded. Allows to pause, rewind, fast-forward and view from any point. 

    1. Concerts and podcasting. Note that although critical, Hypercore is not a complete set of capaabilitirs needed for live steraming apps, e.g. they need vodeo transcoding, micro-payments. Note [Dazaar](https://blog.bitfinex.com/dazaar/dazaar-how-the-internet-should-be-open-free-and-hyper-scalable/), a Hypecore team's recent collaboration with Bitfinex on micropayments for streaming apps based on Hypercore.
    2. Security cameras: at the door or inside (nanny cam). Such non-P2P apps are a gross privacy concern.
    3. Other Home sensors.
    4. Car signals and cameras. Cars are expected to generate the majority of data on Internet, at the rate of terbytes per hour. 
    5. Wearables signals (fitness, health, location for child / elderly monitoring)
    6. Building and Equipment signals streaming.
    7. Drone cameras. 
    8. Other **IoT** signals

 Note that livestreaming also needs always-online capability for content sharing, like any other P2P apps.

### CDN

Hypercore can be used to build a CDN for distributing files to the edge, and distributing load between the replicas. It is static storage friendly. Files and databases can be served from static storage, as in CDNs. Additionally, due to bittorrent-like functionality, it can help CDN to:

    1. Save bandwidth costs by bandwidth sharing, turning media watchers into uploaders
    2. Can accelerate download as allows to load chunks from multiple peers simultaneously. This is especially important for 4K, VR and 3D printing content.
    3. 
    4. Bridge to [HTTP](https://awesome.datproject.org/dathttpd) for browsers.  

Note that Hypercore team still has work to do on efficient editing of large files. Editing existing files is inefficient, it currently results in file duplication. This is not good for videos and for FUSE-mounted Hyperdrive that has a big database file or a log file that needs to be appended to.

### Continuous Backup

Personal and team data backup. Usable on mobiles, desktops, and servers. Hypercore is archivable to S3.

