# Hypercore universe FAQ <!-- omit in toc --> 

Many of the answers below are taken from the Hypercore protocol discussion forums (currently on [Discord](https://discord.com/invite/ga5hxGf) and the older forum on [Gitter](https://gitter.im/datproject/discussions)). All interpretations are ours, and so are the possible mistakes and misunderstandings. Please send corrections as pull requests, or request commit rights. Or just reach out to us over the email posted on github or on [@tradles](https://twitter.com/tradles/). Questions with partial answers are marked with **Need help with this**. Hypercore needs your help, please help us make it fully documented so that all P2P projects start benefiting from it.

- [General](#general)
  - [What are the main components / modules / packages?](#what-are-the-main-components--modules--packages)
  - [What is the USP (Unique Selling Proposition) of Hypercore?](#what-is-the-usp-unique-selling-proposition-of-hypercore)
    - [Streaming](#streaming)
    - [Lego blocks for constructing distributed apps](#lego-blocks-for-constructing-distributed-apps)
    - [Real-time UI updates](#real-time-ui-updates)
    - [Large file handling](#large-file-handling)
    - [Bottom line on USP](#bottom-line-on-usp)
  - [What is offline-first local-first software?](#what-is-offline-first-local-first-software)
  - [What is a streaming DB?](#what-is-a-streaming-db)
  - [How is Hypercore different from BitTorrent, WebTorrent?](#how-is-hypercore-different-from-bittorrent-webtorrent)
  - [How is Hypercore different from ScuttleButt (SSB)?](#how-is-hypercore-different-from-scuttlebutt-ssb)
  - [How is Hypercore different from IPFS?](#how-is-hypercore-different-from-ipfs)
    - [more work needed to compare IPFS and Hypercore](#more-work-needed-to-compare-ipfs-and-hypercore)
  - [Is there a synergy between blockchain and Hypercore?](#is-there-a-synergy-between-blockchain-and-hypercore)
  - [Does Hypercore have a community?](#does-hypercore-have-a-community)
  - [Why Hypercore is not yet mainstream?](#why-hypercore-is-not-yet-mainstream)
  - [What is the state of P2P and its evolution?](#what-is-the-state-of-p2p-and-its-evolution)
  - [Who is using Hypercore P2P framework today?](#who-is-using-hypercore-p2p-framework-today)
  - [How integrity of the data is assured?](#how-integrity-of-the-data-is-assured)
    - [Can Hypercore's author change history?](#can-hypercores-author-change-history)
  - [Is there support for key recovery?](#is-there-support-for-key-recovery)
  - [Is there a regular key rotation and key replacement mechanism?](#is-there-a-regular-key-rotation-and-key-replacement-mechanism)
  - [Is there an authentication system?](#is-there-an-authentication-system)
  - [Is there an authorization system?](#is-there-an-authorization-system)
  - [Is there a discovery system to learn what feeds the other peer shares?](#is-there-a-discovery-system-to-learn-what-feeds-the-other-peer-shares)
  - [If Hypercore is a P2P Web, what is its URL format?](#if-hypercore-is-a-p2p-web-what-is-its-url-format)
  - [What is the biggest gotcha with Hypercore?](#what-is-the-biggest-gotcha-with-hypercore)
  - [Can Hypercore be backed up?](#can-hypercore-be-backed-up)
    - [Backup to S3](#backup-to-s3)
- [Network](#network)
  - [What are the reliability guarantees of Hypercore protocol?](#what-are-the-reliability-guarantees-of-hypercore-protocol)
  - [Is network traffic encrypted end-to-end?](#is-network-traffic-encrypted-end-to-end)
  - [Is Hypercore a push or pull system?](#is-hypercore-a-push-or-pull-system)
  - [How to discover all feeds that a peer can give us?](#how-to-discover-all-feeds-that-a-peer-can-give-us)
  - [Does Hypercore work in the browser, on mobiles?](#does-hypercore-work-in-the-browser-on-mobiles)
  - [Does Hyperswarm work in browsers, on mobile?](#does-hyperswarm-work-in-browsers-on-mobile)
  - [Can Hypercore network protocol be extended?](#can-hypercore-network-protocol-be-extended)
- [Storage](#storage)
  - [Can Hypercore storage be encrypted at-rest?](#can-hypercore-storage-be-encrypted-at-rest)
  - [Is Hypercore quantum-safe?](#is-hypercore-quantum-safe)
  - [Does Hypercore support zero-knowledge store / blind storage?](#does-hypercore-support-zero-knowledge-store--blind-storage)
  - [Does Hypercore support erasure-coding?](#does-hypercore-support-erasure-coding)
  - [Can data be deleted?](#can-data-be-deleted)
- [Hypercore components / modules](#hypercore-components--modules)
  - [Hyperbee](#hyperbee)
    - [Help me picture use cases for Hyperbee?](#help-me-picture-use-cases-for-hyperbee)
      - [Personal database](#personal-database)
      - [Marketplace of data feeds](#marketplace-of-data-feeds)
      - [Lightweight Blockchain client](#lightweight-blockchain-client)
    - [How does Hyperbee relate to Hypercore?](#how-does-hyperbee-relate-to-hypercore)
    - [What are the consistency guarantees?](#what-are-the-consistency-guarantees)
    - [Can it serve as LevelDB replacement?](#can-it-serve-as-leveldb-replacement)
    - [What proves the scalability of Hyperbee?](#what-proves-the-scalability-of-hyperbee)
  - [Hyperswarm](#hyperswarm)
    - [Help me picture use cases for Hyperswarm?](#help-me-picture-use-cases-for-hyperswarm)
    - [Can we distinguish between peers before connecting to them?](#can-we-distinguish-between-peers-before-connecting-to-them)
    - [Is Hyperswarm anonymous?](#is-hyperswarm-anonymous)
    - [Is Hyperswarm susceptible to DDOS?](#is-hyperswarm-susceptible-to-ddos)
  - [Hyperdrive](#hyperdrive)
    - [Can you help me picture use cases for Hyperdrive?](#can-you-help-me-picture-use-cases-for-hyperdrive)
    - [How can Hyperdrive be shared?](#how-can-hyperdrive-be-shared)
    - [What are the limits on file sizes?](#what-are-the-limits-on-file-sizes)
    - [What proves the scalability of Hyperdrive?](#what-proves-the-scalability-of-hyperdrive)
- [What is missing in Hypercore?](#what-is-missing-in-hypercore)
  - [Distributed Time / Clocks](#distributed-time--clocks)
  - [Multi-device editing with conflict resolution (CRDT)](#multi-device-editing-with-conflict-resolution-crdt)
  - [Collaborative (team) editing with conflict resolution](#collaborative-team-editing-with-conflict-resolution)
  - [Topology management](#topology-management)
  - [Schema / data model / data dictionary](#schema--data-model--data-dictionary)
  - [Identity](#identity)
  - [Multi-writer](#multi-writer)
    - [Multi-hyperdrive](#multi-hyperdrive)
    - [co-hyperdrive](#co-hyperdrive)
    - [Multi-hyperbee](#multi-hyperbee)
    - [Union](#union)
  - [Consensus / converging state](#consensus--converging-state)
    - [Databases](#databases)
    - [Collaborative editing](#collaborative-editing)
    - [CRDT and cloud peers](#crdt-and-cloud-peers)
  - [Is Hypercore multi-process-safe?](#is-hypercore-multi-process-safe)
- [Which additional modules, outside of core modules, are notable?](#which-additional-modules-outside-of-core-modules-are-notable)
- [Where can I learn more about Hypercore universe?](#where-can-i-learn-more-about-hypercore-universe)

## General

This section is for general questions. See other sections for questions specific to individual Hypercore modules.

### What are the main components / modules / packages?

- **[Hypercore protocol](https://www.datprotocol.com/deps/0010-wire-protocol/)**, secure network protocol, providing reliable peer data exchanges.
- **[Hypercore](https://github.com/hypercore-protocol/hypercore)**, append-only log that can be used as-is, and is also used as a building block for other data structures.
- **[Hypertrie](https://github.com/hypercore-protocol/hypertrie)**, a key-value store, which uses the underlying Hypercore and is used by other higher level services, like Hyperdrive, for files directories and metadata. You can view key-value store as a simplest possible database and it is a [common component in modern applications](https://www.consul.io/docs/intro/vs/zookeeper), and especially as embedded store in P2P applications. E.g. Ethereum uses KV store for [smart-contract storage](https://medium.com/hackernoon/getting-deep-into-ethereum-how-data-is-stored-in-ethereum-e3f669d96033).
- **[Hyperbee](https://github.com/mafintosh/hyperbee)** goes much higher than Hypertrie by providing sorted range queries, and can therefore can be used to build indexed databases. It is compatible with the popular LevelUP interface, a [standard building block](https://github.com/Level/awesome#awesome-level) for databases, query engines, and even several SQL engines.
- **Hyperdrive**, a component for a P2P alternative to Google Drive and Dropbox, providing team file sharing, including great support for large media files. Hyperdrive can also be mounted as a normal OS folder, with the help of FUSE interface.
- **[Corestore](https://github.com/andrewosh/corestore)**, to managing many Hypercores you typically end up authoring or replicating from others.
- **[Hyperspace](https://github.com/hypercore-protocol/hyperspace)**, a server that uses Corestore and Hyperdrive to provide availability and persistence to hypercore data structures. It offers a network API for using hypercore from any language. Hyperspace notches another step towards the P2P alternative for Dropbox and Google Drive. Key missing components are a permission system and collaborative editing, which is work in progress by the hypercore community.
- **[Hyperswarm](https://github.com/hyperswarm/hyperswarm)**, a discovery mechanism for connecting to other peers (sort of a decentralized DNS), direct P2P connections (NAT traversal), and P2P connection management.
- **[Beaker Browser](https://beakerbrowser.com/)**, a full-blown browser that also supports the Web without servers (P2P Web).

### What is the USP (Unique Selling Proposition) of Hypercore?

Hypercore is an open source P2P technology, but we saw other P2P technologies, BitTorrent and Bitcoin. What is unique about Hypercore?

#### Streaming

Hypercore's key USP is **streaming**. You can think of it as video streaming, but now for videos and also filesystems, databases, messages, IoT signals, and any other structured data constructs. With streaming, you get:

- **Almost immediate access**, even though the data is not yet fully downloaded or may never need to be fully downloaded
- **Higher security**, as it provides the verifiable integrity and authentication for each data element on the wire. This is huge! A typical database, file and messaging servers stake their security on the initial connection establishment and protecting communications on the wire. But normally they do not guard against a compromised or fraudulent peer, while Hypercore does. Our evolution in this area of security needs to always examine data from remote peers in view of the potential risk and the probability of fraud.
- **Higher scalability**, as you can shove your streaming database in AWS S3 and let billion people use it.

This streaming point needs to be repeated again and again, as streaming data, just by itself, without any other wonderful Hypercore capabilities, may create a new class of applications, much like Netflix re-invented the movie watching. This paradigm shift is one reason why Hypercore is hard to grok for app developers, it just requires full rethinking of our current architectures.

Note, when reading Hypercore docs you will find many references to sparse replication. This is the capability used for streaming, allowing a peer to efficiently request individual blocks from remote peers, instead of loading the whole remote dataset, be it a video file or a database.

#### Lego blocks for constructing distributed apps

Another USP of Hypercore is that it implements essential patterns of distributed systems in a reusable way, so that systems and applications are not forced to re-invent the wheel.

**WAL**. All distributed systems need a [Write Ahead Log (WAL)](https://martinfowler.com/articles/patterns-of-distributed-systems/wal.html), be it databases, orchestration engines, like Zookeeper or etcd, or event streaming systems like Kafka. Every system implements its own WAL today. Hypercore generalized this pattern as an append-only-log and consistently uses it in its higher-level data structures such as Hypertrie, Hyperbee, Hyperdrive.

**Time travel**. Hypercore provides universal history for all data structures which work on top of it, which gives them a universal undo-redo, rewind-replay. This capability is common in editors, but now it can be used in any application including retracing actions in a filesystem and a database. Use cases are plentiful:
- [time-travel debugging](https://elm-lang.org/news/time-travel-made-easy)
- for reactive applications (React, [Reflux](https://github.com/reflux/refluxjs#more-on-stores))
- customer support (to replay user actions)
- building a test suite that starts from different checkpoints playing out many scenarios
- forensic investigations
- playing out what-if business scenarios
- to support blockchain reorg in a full node
- for performing risky operations, knowing you can come back to a starting point, such as installing a new version of the app and rolling back if it does not work well. Same for changing configuration of the system and rolling back
- a million other use cases, all with one simple abstraction, that all users already know and love

**Recovery** Same history capability can be used for classic database point-in-time recovery, DB and filesystem snapshots, and versioning for data integrity assurance, VM snapshots, filesystem and DB snapshots, container image layers, etc. etc.

#### Real-time UI updates

We have gotten used to how Gmail automatically refreshes UI when new email arrives or when you view email on mobile, and it is marked as read now. This capability is pervasively used by Google in Docs, Slides, and other apps. Distributed apps need to match that and Hypercore's real-time updates, including on changes on other devices or by our teammates, provides us with this capability.

#### Large file handling

Many applications (like chat, group chat, photo apps, social media apps and collaborative apps) need an ability to handle file sync, especially for very large media files. Those providers hold large files in the central holding area, and we never really know of they delete them afterwards, potentially violating our privacy. They also have significant limits on file sizes. Hypercore is geared really well to enable these scenarios without a central server / provider and without limits. And on top of this it adds partial sync or streaming, so data do not need to be loaded fully to be viewed / explored.

#### Bottom line on USP

Distributed apps need these and therefore apps using hypercore become simpler to write.

Need help with this:
How would one implement in Hypercore forwarding a message with a large video from one chat to another (both in a one-on-one and a group chat).

### What is offline-first local-first software?

Take a look at [Jared Forsyth's criteria](https://jaredforsyth.com/posts/in-search-of-a-local-first-database/) for the above and the various products he reviewed using these criteria. The framework for this type of software is very hard to create, but it is a fresh direction away from massive aggregation of our personal data, and it is close to become a reality. Isn't it why you are here?

Hypercore is built to give you full control of your data. This means, it continues to work even when you have no connectivity, when your other peers are offline, and when hosting / cloud provider closes your account. It also allows portability to other machines or hosting providers.

Note for example, that Google Docs only has support for offline work in Chrome, but not in other browsers. This is how these services tie you up. The new phenomenon is de-platforming, when app provider, like Twitter closes your account, or App Store blocks your app downloads. Facebook and Twitter famously killed rich ecosystems of apps on their platforms.

By relying on providers without a mobility we give up on self-sovereignty and core freedoms and become slaves of the platforms, morphing our behavior to their demands, and facilitating creation of mass surveillance systems, like happened with WeChat and other platforms in China.

### What is a streaming DB?

There is a new hot area in Big Data world for querying static databases. In AWS it is Athena, based on Apache Presto engine, and SQL SELECT. CSV Files (or files in JSON, Parquet, ORC, Avro formats) are shoved into S3 and then queried by Serverless applications and by Business Intelligence packages like Tableau.

This requires no databases servers and shows where Hyperbee can be very useful.

Database with data stored in S3 (or the like) is very tricky to make performant. AWS Athena uses above specific formats, helps split large files into smaller chunks, has tools to prepare columnar indexes for each S3 object to enable search queries, adds extra metadata to help decide which S3 object contains the right subset of data for the query and provides a farm of servers that queue and execute your queries. S3 Select provides a simpler alternative to above, avoiding the use of server farm, but also with decreased functionality. 

Why is this important to understand in view of Hyperbee streaming? Because Hyperbee provides a similar capability implemented in a completely different way. It not only does not require servers, like S3 Select, its underlying protocol is optimized to load byte-ranges from the [S3 object] offset, and efficiently traverses the btree (in Hyperbee) of the trie (in Hypertrie) to avoid extra round trips when executing queries for remote data (S3 in this case). This is a so called sparse mode in Hypercore.

What other applications that can we think of that can be enabled by such a server-less DB, a DB that redefines how querying is done (via sparse data propagation), a DB that embeds a replication mechanism?

Some pointers to possible answers can be found when we compare a P2P source control system Git that replaced SVN and CVS which used central server. Those entrepreneurs that think "Is it possible to make a big business on this?", please note that Microsoft bought Github for $7.5B.

### How is Hypercore different from BitTorrent, WebTorrent?

**BitTorrent**. Hypercore can do what BitTorrent does and more. Hypercore can do discovery and accelerated file download with bandwidth-sharing like BitTorrent, that is, the more viewers watch, the better it works.

But Hypercore can do more - it is built as a data and communications framework for modern decentralized applications.

1. Applications need data structures. Hypercore provides append-only log, Hypertrie key-value store, Hyperbee database and Hyperdrive filesystem.
2. Hypercore supports data editing as a design principle. [BitTorrent enhancement BEP 46](https://news.ycombinator.com/item?id=17306106) exists for updating files, but it is limited, e.g. it does not allow updating a record in a database, so is not suitable for applications.
3. It provides full data add/edit version history which allows auditing, point-in-time-recovery, and state snapshots.
4. It provides sparse download like BitTorrent, but extends it to databases.
5. Hypercore has data access authentication.
6. Hypercore has network encryption.

**WebTorrent**. WebTorrent is awesome, it pioneered BitTorrent in browsers and its is a great success, but its mission statement was just that, a BitTorrent for the Web.

Note that WebTorrent's tech can be helpful to Hypercore, as it perfected peer discovery (via DHT) on the Web and it allowed a number of innovative streaming clients to emerge, which could be helpful for Hypercore applications, like Beaker Browser.

### How is Hypercore different from ScuttleButt (SSB)?

[Secure Scuttlebutt (SSB)](https://en.wikipedia.org/wiki/Secure_Scuttlebutt) is a peer-to peer communication protocol, mesh network, and self-hosted social media ecosystem. Hypercore has been growing towards a more generic model of structured data (file systems, databases) synchronized over many devices.

- **Durability**. Each user hosts their own content and the content of the peers they follow, which provides fault tolerance. Same as with Hypercore.
- **Availability**. It suffers from less than 100% availability, since peers are not always online. This is similar to Hypercore. Always-on seeding nodes are needed.
- **Integrity**. Messages are digitally signed and added to an append-only list of messages published by an author, like Hypercore. It ensures content is not tempered with as it is propagated through the network, like Hypercore. 
- **Consistency**. Data is distributed with a simple read-only eventual consistency, like Hypercore.
- **Streaming**. SSB is not well suited for streaming, as it does not have a sparse data structure (enabled in Hypercore by Merkle trees, while SSB uses linked lists).
- SSB uses a gossip protocol to sync data between peers. It does not automate peer discovery for a given dataset (e.g. via DHT), so topology must be manually managed. Hypercore uses a DHT to automate discovery of peers for exchanging of data.

### How is Hypercore different from IPFS?

Both are cool open source P2P data projects that have existed for roughly the same 5-7 years.

You can review Reddit discussion that makes [some good points](https://www.reddit.com/r/ipfs/comments/glnra9/hypercore_protocol/).

Some key differences, [described here](https://www.datprotocol.com/deps/0002-hypercore/), are:

| Feature | IPFS | Hypercore | 
| -- | -- | -- |
|Addressing | Content-based addressing | Public-key based addressing |
|Addressing stability |  Dynamic address, changing as block changes | Static stable address |
|Addressing granularity| each block has unique address (block's hash) | Address (pub key) corresponds to a collection of objects / files, each consisting of many blocks |
|Filesystem|Low. Files are composed of lists of linked blocks, no notion of file directories, metadata, |Great. Files are managed as full-blown filesystem, with stable API and a daemon that provides REST API and [POSIX-compliant](https://en.wikipedia.org/wiki/POSIX) OS extension, so it appears to users as a regular folder|
|Storage size efficiency | Great. Same block can be reused on your machine, even between files. This is usually called deduplication, or dedup. But when block changes, old block remains in storage.| Low. No block-level dedup. Change in one byte, creates a new version of the file. File-level dedup can be achieved with additional management level, called corestore. |
|Mutability| Low. Originally developed for static content, but is being re-designed now. Specifically, the IPNS component attempts to provide stable hash-based address for the file (the tip of the list of blocks), but it needs to be refreshed periodically. New project IPLD is in development and aims for structured data, such as adding primitive data types, maps, lists |In Hypercore editable content was a prime design objective, supported by the internal data structures, its protocol, Change Data Capture system, APIs, etc. Structured data are supported by Hypertrie and Hyperbee |
|Hyper-linking | Yes. Formal specification, called CID. |Partial. URLs work in Beaker, [Agregore](https://github.com/AgregoreWeb/agregore-browser) and [Gateway](https://gitlab.com/gateway-browser/gateway/) browsers, but formal definition for links for structured data is still in works |
|Human-friendly naming| No. [IPNS](https://docs.ipfs.io/concepts/ipns/#example-ipns-setup) is not human friendly. | No. Hypercore's hyper:// URLs includes hash and is not human-friendly |
|Databases|TBD. [OrbitDB](https://github.com/orbitdb/orbit-db), [ThreadDB](https://docs.textile.io/threads/), [AvionDB](https://github.com/dappkit/aviondb)|Two variants: Key-value store (Hypertrie) and LevelUP-compatible DB (Hyperbee). Embedded DB, does not require DB server. Provides unique streaming capability to greatly improve storage size and startup time. Using Hypercore data structures community produced replicated databases [KappaDB](https://github.com/kappa-db) and [multi-hyperbee](https://github.com/tradle/multi-hyperbee)|
|Availability|Fairly high. IPFS community sponsors hosting of content, there are also commercial providers like [Infura](https://infura.io/) and [Textile](https://textile.io/), and Filecoin protocol to reward hosting | Low. See for example [Our Networks](https://ournetworks.ca/) page referring to both IPFS and Dat URLs and Dat URL does not open. Same [here](https://2019.ournetworks.ca/). [Homebase](https://github.com/beakerbrowser/homebase) attempted to provide hosting. [Datdot](https://github.com/playproject-io/datdot-service) project is developing blockchain-based reward system. Perhaps we need a breakthrough hosting model here, could VPS-made-simple be it?|
|Startup speed| Slow | Great. Hypercore provides sparse replication for any type of data, that allows immediate streaming of both structured data and media content.|
| Discovery |  Uses DHT. Avoids dependency on a more centralized DNS system. IPFS uses a DHT for every single data chunk globally, which works great for dedup. However, IPFS architecture creates an enormous overhead of DHT traffic compared to the other protocols. It also fails to benefit from the assumed knowledge that peers who have one chunk of the repository you’re interested in, are likely to also have more chunks you’re interested in. | Uses DHT (via Hyperswarm service). To avoid overloading DHT, topic in DHT is usually the whole Hyperdrive with potentially millions of files. To find a file via the DHT, URL becomes drive/file. In addition, Hyperswarm provides a flexible mechanism to design your own DHT-based discovery system, e.g. discover communities, teams, people, etc.|
|Directory structures and file metadata| TBD. Somewhat. IPFS simulates directories by creating files with links to other files. | Full. Hypercore does full POSIX-compliant file system emulation and therefore can be mounted natively (via FUSE) to be viewed in File Explorer, Finder and to be used from the command line as a normal file system.|

**Some notes on IPFS goodies:**

- [IPNS has has captured imagination of Ethereum community](https://blog.infura.io/an-introduction-to-ipfs/) to build fully decentralized apps, as most blockchain apps today still keep data and processing centralized.
- Smart contracts can refer to a hash of IPFS file and since it is address is content-based and therefore immutable, it provides the deterministic behavior for the smart contract. IPFS sponsors the storage to provide the guarantee for the data to be available for the dApp that uses this contract to be operational. Very cool!
- IPFS project has produced solid core libraries, like libp2p, solving many of the same issues as Hypercore's Hyperswarm.
- IPFS has implementations in a number of languages, while Hypercore is only in JavaScript. Rust implementation of Hypercore was recently started and hopefully will lead to overall health of Hypercore, forcing better documented specs and more test-suits.
- IPFS team runs a number of public servers that help make the network more usable.
- IPLD is IPFS's sub-system to define structured interlinked data.  IPLD structures implemented on top are ipld-bitcoin or ipld-ethereum.

#### more work needed to compare IPFS and Hypercore

Review these and structure its content for summary below:
https://medium.com/decentralized-web/comparing-ipfs-and-dat-8f3891d3a603
https://blog.cloudflare.com/e2e-integrity/
https://docs.ipfs.io/concepts/usage-ideas-examples/#usage-ideas-and-examples

Rough outline:

- Support for streaming 1) live streaming, 2) recorded content 3) or just sharing a video on a messenger app.
- Integrity - See section on one Hypercore integrity. But how is the integrity of the multiple feeds achieved, e.g. metadata and content feeds in Hyperdrive, or composite feeds like multi-hyperdrive? 
How does IPFS support data integrity? 
- Granularity, not just files, e.g. with Hypercore you can do live updates in the UI in Hypercore, like Gmail does it.
- Does IPFS support connection Multiplexing?
- Secure Session management. Hypercore has sessions with forward secrecy.
- how is NAT traversal different?
- HTTPS and other gateways to provide access when other things do not work. For example, see discussion on Hypercore not working on [campus network](https://github.com/datproject/discussions/issues/87).
- Download progress and health of seeded data. See [discussion here](https://github.com/datproject/discussions/issues/81). How does IPFS handle it?
- Docs availability and depth
- Bandwidth sharing. How does IPFS support it?
- Pinning of files and dirs in IPFS. How management of local cache compares to Hypercore
- URL to individual data elements: File, Resource in the database.
- Change Data Capture - does not exist in IPFS, attempts are being made to create something for 4 years
- PubSub
- S3: https://docs.ipfs.io/concepts/usage-ideas-examples/#aws-s3-integration
- Hosting - https://docs.ipfs.io/concepts/usage-ideas-examples/#ipfs-hosting-with-textile
- Mobile support https://twitter.com/jarredsumner/status/1223633060551225344
- How to build chat and other apps on IPFS and Hypercore
- Git on IPFS or Hypercore. How P2P supports Git: https://www.ctrl.blog/entry/git-p2p-compared.html

### Is there a synergy between blockchain and Hypercore?

Both blockchain and Hypercore provide verifiable data structures. But blockchain is limited to very small storage and Hypercore is limited by absence of pubic timestamping and data history, and the absence of verifiable computations. See further on this in section *"Can Hypercore's author change history"*.

Here are the cases where blockchain and Hypercore already help each other:

- [Ara.one](https://ara.one/): crypto rewards for content
- [Datdot](https://github.com/playproject-io/datdot-substrate): hosting with crypto incentives
- Bitfinex: streaming hyperbee as trading signals for crypto exchange)

This use case is theoretical but is plausible:

Light client to blockchain full node, using streaming hyperbee, to avoid dependence on centralized infrastructure, like Infura. Most blockchain full nodes support a very limited amount of queries by default. Many apps need a lot more, and for that infrastructure players, like Infura, have created a SaaS infrastructure. But this re-centralized the decentralized P2P setup and re-inserts a trust into a specific company.

### Does Hypercore have a community?

Yes. Community is very active and helps newcomers and developers building on Hypercore. [Join it on Discord](https://discord.com/invite/ga5hxGf), open [issues on Github](https://github.com/mafintosh/hypercore), and follow core developers on Twitter [@mafintosh](https://twitter.com/mafintosh), @pfrazee, and @andrewosh.

### Why Hypercore is not yet mainstream?

It is a fact that Hypercore is 7 years old and still has no runaway apps built on it. So what gives, if it is so amazing, and it is! Here is my take, aside from a general statement that making a P2P framework work smoothly is super-hard:

Many P2P apps struggle as they lack availability, durability and work in the unforgiving networking environments.

- **Availability**. For example, in a P2P collaborative editing app competing with Google Docs, once you close your laptop, your collaborators can't get your latest content, unless they were online when you made edits. With Google Docs, if you had a connection at the time of the last edit, the changes are available to others, even if you went offline right after. This is especially important for team work across the timezones. So some master nodes that "seed" the content are always needed in P2P applications (e.g. Hashbase), but these so called super-nodes often re-centralize things and introduce challenges for permissioning, data sovereignty, and data privacy. Availability problem remains unsolved.

- **Durability**. We are spoiled with Google (and others) taking care of preserving our content. We pay a steep price of giving them everything on us, but this convenience is very hard to achieve in P2P world. Your peers may be good friends but there is no guarantee they will not lose your precious content. Many solutions are being tried, including those with Cryptocurrencies incentivizing users to keep content, but they all have technical and convenience frictions. Besides, who wants to be responsible for disseminating a potentially illegal content? Durability problem remains unsolved.

- **Networking**. Current Internet, with its routing and firewalling system is just hostile to P2P connections. Although Hypercore's Hyperswarm offers an ingenious NAT hole punching, there are too many edge cases, when it does not work on mobiles, it needs workarounds in browsers and is often blocked by VPNs and corporate firewalls. This does not mean it can't be used, we just need a fallback to a trusted server acting as a proxy. But this comes at the same price of decentralization. Besides, if the user wants to send data to someone else, both devices need to be online simultaneously.

Reliable P2P networking **remains unsolved**.

Is there an answer to those perpetual problems of P2P? We believe there is. In crypto world the answer was found with the notion of miners. This is why some P2P projects are attempting to repeat this approach introducing their own blockchains. IPFS team's Filecoin, Storj, Theta.tv and a number of others are examples. But they are all focused on data storage.

Hypercore is so much more. It is a foundation for apps, it is made for storage, content distribution, messaging, decentralized databases, etc. And it feels like it is a good match for analytics and AI as well (more on that later).

Perhaps the answer to perpetual P2P reliability problems is not in copying the blockchain's mining model or just offering the crypto-incentives to host files. Maybe the answer is orthogonal, instead of looking to incentivize third-parties to keep our files, we could do it ourselves, with an always-available cloud peer, a companion to the sometimes-available personal devices we own already.

Viewed this way, cloud peer is not a hosting provider, it is just a different type of a personal device. It does does not have a screen, but it is capable in a different way, it complements our other personal devices with its 100% availability, a durable storage and elastic / expandable compute and data store.

Taking it a step further, the cloud peer could be a place to run many Hypercore apps that can't run on personal devices. Think cloud app store, unencumbered by the domineering Apple and Google app stores.

This will make Hypercore shine!

### What is the state of P2P and its evolution?

Both classes of P2P systems, blockchains and P2P data are nudging towards mass market adoption. Cryptocurrencies made huge strides in creating a new foundation for global financial system, especially evidenced by the rise of DeFi in 2020.

In addition, many new projects are employing tokens as incentives mechanisms to avoid points of centralization that exist today. Examples are VPN (Orchid), Routing (PKT + CJDNS), social media (Steam), live streaming (Theta.tv), Web Browsing (Brave), Storage (StorJ, IPFS FileCoin). Several high-profile projects were shut down (Telegram TON) or have hit high resistance from governments (Facebook Libra).

Crypto-currency P2P projects are a huge step ahead of data-centric P2P projects like Hypercore and IPFS, as they have found their native hosting model, in the form of miners. This makes them independent of the Cloud providers, which is essential for their survivability in the face of regulatory scrutiny.

P2P Data projects do not experience such a resistance, but they have not invented their own sustainable infrastructure. IPFS is looking to Filecoin to incentivize storage providers, while meanwhile subsidizing hosting via ipfs.io.

Hypercore community has produced Hashbase, Homebase, DatDot and other hosting solutions, but they have not reached significant maturity and adoption. Personal cloud peer could be an alternative to the aggregated hosting model.

Almost every P2P project is still largely held back by numerous overlapping infrastructure needs for this novel tech to hit a wider market. E.g. one common problem is the management of the ownership keys.

The difference between Hypercore and IPFS is that it has moved relatively slowly with its marketing. The core team chose to patiently and somewhat stealthily build the foundational technology and avoid starting the "hype cycle", that is until it is ready for prime time. Initial releases of Hypercore (then called "Dat") in 2016-2018 had scaling issues, which have been addressed by subsequent releases.

Specifically, Hypercore team focused on the performance of its unique "streaming database" design (see below). Team prepares for marketing push at the end of this year (2020), starting with the Beaker ecosystem (Beaker is the Web and P2P Browser and authoring platform built on Hypercore)

### Who is using Hypercore P2P framework today?

Each project building on Hypercore is stretching Hypercore's flexibility and contributes back solutions that are not yet available in the core. Then Hypercore team generalizes them and makes available for everyone. See some of the projects and their notable contributions:

- Bitfinex, major crypto exchange, uses:
  - **Hyperswarm** in their microservices framework [Grenache](https://github.com/bitfinexcom/grenache). Bitfinex helped [extend](https://github.com/bitfinexcom/grenache-grape/pull/73) Hyperswarm DHT to improve peer discovery. Bitfinex also pushed the envelope with Hypercore team on creating the first payments framework for Hypercore.
  - **Hyperbee** to deliver [streaming data and signals](https://blog.bitfinex.com/dazaar/backtest-your-trading-strategies-with-bitfinex-terminal-honey-framework/) for backtesting trading strategies. Hyperbee allows Bitfinex to create a community of free and paid providers of trading signals that seed structured data like BitTorrent seeds files.
- [Pushpin](https://github.com/automerge/pushpin). A local-first collaborative corkboard app. PushPin supports taking notes, and can archive web content, images, PDFs, audio, video, and any other files you might want to hang out. It can synchronize across all your devices, and doesn't require any infrastructure to operate. Pushpin's collaborative simultaneous editing is achieved with the help of [Automerge CRDT](https://github.com/automerge/automerge).
- [Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/2_work-plan/mvp/mvp-design.md), focused on enabling teams. Cobox community created a KappaDB and collaborative editing.
- [Peermaps](https://peermaps.org/), building P2P alternative to Google Maps based on OpenStreetMap
- [Datdot](https://github.com/playproject-io/datdot-substrate), a P2P hosting for Dat / Hypercore data structures, with blockchain-based incentives. Similar to Filecoin for IPFS. Note a command-line (CLI) [publisher tool](https://github.com/RangerMauve/hyperdrive-publisher) to publish hyperdrive to some hosting site like Datdot, and later, restore it from hosting to another location. Restored hyperdrive is writeable (make sure the original is stopped and not writing anymore or you will get a corrupt hyperdrive - see Gotchas section)
- [Sonar](https://arso-project.github.io/sonar-book), distributed media archives on Hypercore. Note an interesting [bulk update](https://discordapp.com/channels/709519409932140575/727886901100675083/755723909709561856) feature discussion re:Sonar, which sounds like addressing a pain similar to serverless apps.
- [Beaker browser](https://beakerbrowser.com/). Beaker is likely the most complex app on top of the hypercore today. It supports both normal web browsing (https:// protocol) and hyper:// protocol. It also aims to become a P2P social media with a way for people to post blogs, comments, likes, etc. without central entity like Facebook. It achieves that with mutual hosting, where your Beaker browser will hosts sites for people you follow.
- [Agregore](https://github.com/AgregoreWeb/agregore-browser) browser, takes a different approach, aiming to be very simple and lean, moving all additional capabilities into downloadable extensions. It also expands beyond http and hyper protocols, aiming to support any P2P protocol, including IPFS.
Currently: http://, dat://, hyper://, ipfs://, ipns://, gemini://
Planned: earthstar:// and eth://
- [Gateway](https://gitlab.com/gateway-browser/gateway/) mobile browser
- See at the bottom of [Hypercore protocol page](https://hypercore-protocol.org/)
- [Consento](https://consento.org/). A mobile digital identity app  that you use to keep your data protected. Supports co-ownership of data. Protects keys to data by dividing a key into pieces, each given to some friend. To reconstruct the key, you ask some of those friends to give you their piece (let's say 2 out of 3 is enough - you choose the ratio, e.g. 3/4).
- [Ara.one](https://ara.one/). ARA aims to help creators maximize the value of their work, removing third-parties, reducing hosting costs and, most importantly, attracting content consumers with rewards (via blockchain-based tokens).
- See discussion forum where people [showcase their Hyper projects](https://discordapp.com/channels/709519409932140575/712037351244955809/712037741126221924).
- And finally, see what [apps are built on IPFS](https://github.com/ipfs/awesome-ipfs) and new ideas [listed by IPFS community](https://docs.ipfs.io/concepts/usage-ideas-examples/).

### How integrity of the data is assured?

Hypercore goes into great length to provide data integrity. For that it uses a Merkle tree hashing into it each block that is added to the append-only log.  On every change the root of the Merkle tree is signed by the private key of the of this Hypercore (note that this also creates a limitation of a single writer, see later how it is overcome). When Hypercore is shared to another peer, with the help of Merkle branches it is possible to to prove authenticity and integrity of a subset of blocks, without sharing the whole Hypercore. This allows to accept partial data from the untrusted peers (as they can't fudge the data). This capability supports a number of potential use cases, like distributed caching and CDNs, bandwidth sharing, distributed files systems, streaming databases, audit trails and supervision protocols, etc. See an [interesting discussion](https://github.com/AljoschaMeyer/bamboo/issues/2) in which Hypercore integrity guarantees were challenged and defended. 

Append-only log also allows to recover the state of Hypercore at any prior a point-in-time, a highly desirable function in databases. It allows to preserve Hypercore backup snapshots at a particular point in time.

In addition, Hypercore supports versioning of data elements, a capability highly sought after in enterprise systems. Versioning allows protect data from accidental overwrite by a human being or a broken or malicious program. It also provides auditability and regulatory compliance.

#### Can Hypercore's author change history?

An actor could decide to revert Hypercore to a previous state, and share this fork. This could also be used in the attack where attacker aims for the initial data gets to either get deleted or destroyed by backups. Another possibility is for the author to rewind and serve different version of the history to different peers. See a [community discussion on this subject](https://gitter.im/datproject/discussions?at=5d9d962e973587467320b241).

The required protection can be achieved by sealing Hypercore's root on public blockchain, utilizing its immutability and secure timestamping properties. Hypercore also does not guarantee long-term write-once storage. See explanation how audit trails benefit from [such services added on top](https://techblog.bozho.net/audit-trail-overview/).

As Hypercore signing key is rotated with [multi-key](https://github.com/mafintosh/hypercore-multi-key), we need a proof that the new key is a valid successor from the old one. Different applications might use different algorithms for such a transition, and recipients of hypercore need a way to verify the code for this algorithm was not altered and was executed properly, but without running the code themselves. Smart contracts is one way of doing this, and Zero Knowledge provable computation is an [emerging new option](https://medium.com/starkware/hello-cairo-3cb43b13b209).

Why can't recipients run the code themselves, like they do when verifying Merkle tree and signature in Hypercore today? Because the key rotation algorithm may involve processes that recipient can't repeat, like contacting a 3rd party for key recovery, or not having access to some private data that was used by the algorithm's code, but can't be shared. For reference on Zero Knowledge see this [question on StackExchange](https://crypto.stackexchange.com/questions/37581/why-are-zk-snarks-possible-in-laymans-terms).

Need help with this.

### Is there support for key recovery?

No. But a community solution and other open source projects exist that can possibly be adapted.

Note that corestore makes this easier as it introduces Master key (and generates deterministically the keypairs for Hypercores it manages). It is much easier to manage one key than many, one per Hypercore.

Key recovery is essential need for any P2P applications, and the same need for Bitcoin, as the user may only rely only on themselves for key management.

- Community solution: [secret into N parts and allows restore with M of N replicas](https://github.com/jwerle/hyper-secret-sharing)

- Full blown framework for this exists, called [Dark Crystal](https://darkcrystal.pw/)

- A number of implementations of [Shamir secret sharing in JS](https://github.com/topics/shamir-secret-sharing?l=javascript&o=desc&s=stars) exist
  
For reference, see how open source app [Consento](https://consento.org/) does it.

### Is there a regular key rotation and key replacement mechanism?

Yes, for ephemeral session encryption keys.
No, for Hypercore log, but can be added on top with the help of [Hypercore-multi-key](https://github.com/mafintosh/hypercore-multi-key) module which allows to switch to a new keypair. It is your responsibility to sign the new key with the old to establish the secure continuity, and to verify this signature on receiving nodes to prove the legality of key rotation. Perhaps this can be added as a [hypercore extension](https://github.com/mafintosh/hypercore-extension-rpc)?

### Is there an authentication system?

Yes. Each Hypercore feed has a corresponding public / private key pair.

1. The receiving feed must prove it knows sending feed's publicKey.
2. There is an extension that allows to [prove you own feed's publicKey](https://github.com/substack/hypercore-authenticate-session-extension).
3. There is a hook to registered a custom feed authenticator.

### Is there an authorization system?

Yes, but it has limitations:

- **Level of granularity** is a hypercore. For example, if you like to give file access to one person and not to the other, you need to put this file in a separate hypercore to be able to achieve that. This works for small number of files, and is an approach used by Hypermerge for [Pushpin](https://github.com/automerge/pushpin). Note that you start hitting limits on performance with too many hypercores file handles used and limits on replication of many hypercores between nodes.

- **Flexibility**. Access control is based on revealing the Public key for your hypercore to a peer who needs access. Since Public key is baked directly into the hypercore data structure, once it is revealed, there is no taking back the access. 

See a [community discussion on this subject](https://discordapp.com/channels/709519409932140575/727886901100675083/762787502456963101) with one idea being to use **per-file encryption**. You can replicate all of the hypercore but have separate keys for individual records or files. This fits the project management apps, small team collaboration with light-weight documents, but is not suitable for large file sizes.

Need help on this.

### Is there a discovery system to learn what feeds the other peer shares?

Yes. Managed by Corestore, or by the community-provided multifeed.

Need help with this.

### If Hypercore is a P2P Web, what is its URL format?

URL looks like this `hyper://<public-key>[+<version>]/[<path>][?<query>][#<fragment>]` where `public-key` is the address of the hypercore feed, `version` is an optional numeric identifier of a specific revision of the feed (also called index or seq, a block number in the append only log), and `path` `query` `fragment` are akin to HTTP URLs (though `query` has no defined interpretation). Formal schema is defined by [this specification](https://github.com/hypercore-protocol/hyp/blob/master/proposals/0002-hyper-url.md). Beaker browser is the primary way such URLs are used.

There is a proposal for [Strong linking](https://github.com/datproject/dat/issues/976) which would add a `hash` to URL. This is a hash of the hypercore at a specified `version`. This would lock down the history of the hypercore at that `version`.

To understand why this link is strong, you need to know that every time a new block is added to hypercore feed, a new root hash corresponding to all the data in hypercore, up to current position, is calculated and saved in hypercore (this hash is also referred to as the Merkle tree root hash or just tree-hash). Now, should the author, by mistake or intentionally, rewind their hypercore to `version - 1` or earlier, and fill it with different data, the hash of the hypercore at `version` will be different and it will now not match the hash given in the URL.

Note that the hypercore can and will continue to be appended to after the point referred to in the URL. This is normal and fine, and URL will continue to work, referring to a particular point-in-time in data history. But it does not mean that the strong URL creates an obligation for the author not to rewind the hypercore. It only means that such change can be discovered by whoever has received strong URL.

Applications can use [this module](https://github.com/mafintosh/hypercore-strong-link) to construct and verify strong links.

Use cases for strong links include listing files in a [module's manifest](https://gist.github.com/pfrazee/c13b86f84485aced69a1509a00b12e66), cross-linking between JSON attributes in Hyperbee object and a file in Hyperdrive (e.g. for a file attached to an email).

### What is the biggest gotcha with Hypercore?

- You can create conflicting forks of a hypercore log by first copying the hypercore feed directory to another machine along with its private key and then writing into hypercore copy while making updates in the original. There is an idea how to address this with [self-healing hypercores](https://gist.github.com/martinheidegger/82dbf775e3ff071d897819d7550cb3d7).

- If you rewind the feed that is replicated, [replicas will stop syncing](https://discord.com/channels/709519409932140575/709522092424429742/765662438103842866).

### Can Hypercore be backed up?

Yes. see [Hypercore archiver](https://awesome.datproject.org/hypercore-archiver) as a starting point, but more work is needed:

#### Backup to S3

Backup to s3 is not supported yet. This [underlying module's](https://github.com/random-access-storage/random-access-s3) does not have the write method implemented yet. This is work in progress, tracked by [this issue](https://github.com/tradle/why-hypercore/issues/1).

## Network

### What are the reliability guarantees of Hypercore protocol?

Hypercore [requires the underlying transport](https://www.datprotocol.com/deps/0010-wire-protocol/) to provide the following guarantees:

- reliable delivery (no dropped or partial messages)
- in-order delivery of messages

Those are satisfied by TCP, WebSockets, WebRTC, QUIC and uTP

Hypercore itself adds:

- no missed messages, no duplicates (note that TCP and others above provide this only on a single connection, but not across interrupted connections)
- efficiency, a single connection is used for multiple channels
- persistence of messages

### Is network traffic encrypted end-to-end?

1) Yes for Hypercore and 2) no for Hyperswarm.

Hyperswarm uses uTP over UDP to connect to DHT nodes and for NAT traversal (hole-punching). It can use [Noise protocol](https://github.com/mafintosh/noise-network), but doesn't today [as it will cause extra round trips (RTT)](https://discordapp.com/channels/709519409932140575/727886901100675083/757704436289372225). Hyperswarm also does not authenticate peers. Note that TLS 1.3 achieves 0-RTT on re-connections, and QUIC achieves 0-RTT on the first connection. See [analysis and mitigation](https://noise.getoto.net/tag/0-rtt/) of the replay-attacks for these 0-RTT protocols by CloudFlare. Cloudflare open sourced [QUIC / HTTP/3 implementation in Rust](https://github.com/cloudflare/quiche) (so it may be able to run in WebAssembly in Node and browser). See alternative [0-RTT in Noise](https://noisesocket.org/post/1/), which removes dependency on SSL certificates.

Hypercore uses Noise protocol for authentication and encryption. Noise is the protocol designed as part of Signal Messenger and is now used by WhatsApp, WireGuard, Lightning, I2P, etc.

A new channel is open for each Hypercore and multiple channels use the same connection, which is great. What is cool is that with the help of Noise, each channel gets its own encryption and keys are rotated to achieve forward secrecy (attacker who cracked this session's key will have to crack it again for the next session).

Note, as always with end-to-end encryption, you need to watch out for the cases when you introduce a proxy in the middle, for example to deal with overly restrictive firewalls. The best approach is for the Proxy to be blind, just passing encrypted streams between peers.

### Is Hypercore a push or pull system?

Normally updates are pulled by the peers. Protocol supports a Push-ing data as well but it is [not exposed in the API today](https://discordapp.com/channels/709519409932140575/709519410557222964/755797065879257178)

### How to discover all feeds that a peer can give us?

Hypercore is not like Kafka, which is one big log. With Hypercore you usually have many Hypercore logs. So you need a way to manage them and discover what hypercores other people have shared with you.

The bootstrapping mechanism for this is to find peers, a Hyperswarm. But it is not enough, thus several discovery systems were designed, and the main one is corestore. Simpler one, is multifeed created by community, but it assumes all feeds are public.

### Does Hypercore work in the browser, on mobiles?

Yes. Hypercore is transport-independent. One can use TCP/IP, WebRTC to peers, WebSockets to server.

### Does Hyperswarm work in browsers, on mobile?

Not directly, but community solutions exist. 
See the [issue for this](https://github.com/hyperswarm/hyperswarm/issues/62).

It is a hard problem, note that [WebTorrent works in the browser](https://webtorrent.io/docs), but ["DHT in browser"](https://github.com/webtorrent/webtorrent/issues/288), even after 7 years of discussions, is still not realized.

Current solution, [advised by Hypercore team, uses 2 servers for signaling](https://github.com/RangerMauve/hyperswarm-web).

Summary of a problem and an alternative solution:

1. **No UDP in browsers**. Other transport protocols create connection establishment delays (extra round-trips), which make DHT too slow to be practical. Delegation to signaling servers challenges privacy.

2. **Corporate firewalls may block UDP**. Although the hope arises with QUIC / HTTP/3 gaining traction as it is using UDP on TLS port 443.

3. **No peer discovery on Cell Phone networks**. Cellphone networks employ symmetric firewalls that block direct P2P connections (although UDP works, NAT hole punching does not). This affects mobile apps and PCs on HotSpots. With 5G proliferation, more applications operate on cell networks, making progress for direct P2P connections unlikely.

4. **DHT state needs stability**. Peers that come and go (browser tabs) lose DHT state and need to recreate it (although this can be overcome with caching state in browser's database). Peers that change their IP address too often, destabilize DHT. This is the case of cell networks.

5. **Porting Web and mobile environments**. See a number of issues still pending resolution to make Hyperswarm and Hypercore [work in react-native](https://dat.discourse.group/t/dat-and-react-native/184). These problems can be solved.

### Can Hypercore network protocol be extended?

Yes. The [protocol](https://github.com/hypercore-protocol/hypercore-protocol) is formalized with protobuf and supports [defining extensions](https://github.com/hypercore-protocol/hypercore-protocol/#stream-message-extensions).

See community video that explains the [Extensions system](https://youtu.be/HyHk4aImd_I?list=PL7sG5SCUNyeYx8wnfMOUpsh7rM_g0w_cu&t=4379). Community projects like Cobox and others are using it already.

Possibly useful are [abstract-extension](https://github.com/mafintosh/abstract-extension) and [hypercore-extension-rpc](https://github.com/mafintosh/hypercore-extension-rpc).

## Storage

### Can Hypercore storage be encrypted at-rest?

Yes, offered by community solutions. You will need explore their limitations. See some below:

- [Block-level encryption](https://github.com/little-core-labs/hypercore-xsalsa20-onwrite-hook)

- [Cobox Hypercore Encryption](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/2_work-plan/mvp/mvp-design.md).

- [hypercore-encrypted](https://www.npmjs.com/package/hypercore-encrypted), a wrapper around hypercore.

### Is Hypercore quantum-safe?

Need help with this.

Hypercore uses [Noise-protocol](https://github.com/emilbayes/noise-protocol) which implements the Noise_*_25519_ChaChaPoly_BLAKE2b handshake, meaning Curve25519 for DH, ChaCha20Poly1305 for AEAD and BLAKE2b for hashing.

Handshake and transport encryption are documented by [@Frando](https://github.com/Frando) as part of his implementation of Hypercore in Rust.

- ED25519 is used for signatures, and is not quantum-safe.
- BLAKE2b with 512-bit hashes that is considered [quantum-safe](https://cryptobook.nakov.com/quantum-safe-cryptography).
- XSalsa20 is used as transport cypher and [seems to be quantum-safe](https://crypto.stackexchange.com/questions/70492/how-resistant-are-stream-ciphers-like-salsa20-or-chacha-in-a-post-quantum-world).

### Does Hypercore support zero-knowledge store / blind storage?

Yes, offered by community solutions.
the above terms refer to an encrypted replica kept by a friend or a services provider, like [SpiderOak](https://spideroak.com/one/), but can't be read by them.

Current solutions are provided by the community:

- [ciphercore](https://github.com/telamon/ciphercore)
  
- [Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/3_mock-up/technology/architecture.md)

### Does Hypercore support erasure-coding?

No.
Erasure coding is used to recover data from a subset of overall amount of replicas, and is especially important in hosting across many providers, where none of them has a full version of data, so even if the encryption is cracked, they are not able to read the data.

Open Source S3-compatible object storage, e.g. provided by [Min.io](https://docs.min.io/docs/minio-erasure-code-quickstart-guide.html) has erasure coding.
Cloud providers sometimes offer a virtualized file system over multiple replicas. Open Source Ceph offers it and so does AWS with EFS (note that Ceph is not easy to manage).

### Can data be deleted?

[Somewhat](https://discordapp.com/channels/709519409932140575/709519410557222964/755404488415772746) - you can [clear() your content locally](https://github.com/hypercore-protocol/hypercore#feedclearstart-end-callback), but if someone replicated it already, you can’t force them to clear. Also, internal data integrity records are still kept, but they do not leak any data (Merkle tree hashes are kept, so you can keep appending data to your log even if you clear the contents). Use cases:

- Chat. You can delete a chat message locally. To delete the chat message at recipient(s) need to send a custom some message “please delete this”.
- Mobile. You can delete photos from mobile to save space, but keep them on a replica (your other PC or a Personal Cloud).

## Hypercore components / modules

### Hyperbee

#### Help me picture use cases for Hyperbee?

Use cases for embedded replicated streaming DB are plentiful.

##### Personal database

A database that is automatically syncing between all personal devices, but without the help of Apple, Google or any other central provider. For Cloud this could be a serverless personal-use replacement for AWS DynamoDB (Azure Cosmos, etc.), while providing **complete isolation** of data in a multi-tenant execution environment. Some use cases:

- Multi-device Contact list.
- Multi-device Calendar.
- Multi-device Bookmarks.
- Multi-device list of installed apps and their respective settings.
- Multi-device chat and group chat. See [Cabal](https://cabal.chat/), an attempt to do just that.
- Multi-device email front-end? It is a tall order, but we do need to stop giving Google all our mail. We need to find a backend that takes care of retrieval and sending, spam, virus scanning, and then loads data into Hyperbee + Hyperdrive + [Tantivy search engine](https://github.com/tantivy-search/tantivy).

##### Marketplace of data feeds

Note what Bitfinex is doing with trading data and signals (see above), and extrapolate it to other types of structured data.

##### Lightweight Blockchain client

Hyperbee could very well be a killer app for accessing blockchains.

One of the persistent problems with the blockchains is that mobile and web applications have to rely on full-node servers as trusted gateways, a contradiction to blockchains' trustless value proposition. SPV wallets were designed to solve this problem, but they are (https://www.reddit.com/r/ethereum/comments/avk7ew/is_spv_of_eth_value_transfers_possible/ehg5wud/), are not so lightweight and are anemic as they can't answer all the questions client apps have.

This led to the emergence of services like [Infura](https://infura.io/customers/compound). Hyperbee could be more lightweight and more flexible than SPV. SPV protocol is usually confided to specific proofs, e.g. that a transaction was included in the blockchain. But it can't answer queries like show me 'all transactions involving a specific blockchain address'. Hyperbee can run arbitrary queries against the blockchain node (providing indexes were added). To avoid trusting one Hyperbee, imagine a number of independent Hyperbee providers that all return chunks of data for the same query, a core capability of Hyperbee. With this We have restored a trustless access to blockchains.

#### How does Hyperbee relate to Hypercore?

Hyperbee uses Hypercore as an underlying storage and a replication mechanism. The cool thing is that one replication stream [can carry many Hypercores](https://discordapp.com/channels/709519409932140575/709519410557222964/755415844808556594), which can carry Hyperbees, Hypertries, and Hyperdrives.

To manage multiple hypercore feeds, with permissions, use the corestore.

#### What are the consistency guarantees?

Hyperbee, like any other Hypercore-based data structure is single-writer. That means when it is replicated, it is replicated as-is, and eventually reaches the same state. See multi-hyperbee that builds on top of hyperbee and offers consistency in a multi-master scenario (each node / peer making changes to objects in the same multi-hyperbee, even the simultaneous changes to the same object).

#### Can it serve as LevelDB replacement?

Yep. Needs to be wrapped into [Hyperbeedown](https://github.com/andrewosh/hyperbeedown) and fed into [LevelUP](https://github.com/Level/levelup).

This is awesome as there are many databases that work on top of the LevelUP API exposed by LevelDB. One example is AWS DynamoDB emulation on top of LevelDB. See its [replacement with Hyperbee](https://github.com/tradle/dynalite/). Some tests are still failing, but it is getting there.

#### What proves the scalability of Hyperbee?

Hyperbee is still in Alpha, but perhaps we can stress-test it on loading the whole of the Ethereum blockchain and indexing it in different ways. This Hyperbee could provide a valuable service to the community. We could even put its snapshots in S3, or IPFS for that matter, and let it be streamed. Note that Google BigTable [provides this service](https://cloud.google.com/blog/products/data-analytics/introducing-six-new-cryptocurrencies-in-bigquery-public-datasets-and-how-to-analyze-them).

There is also a number of benchmarks for LevelDB (e.g. [here](https://github.com/maxogden/leveldb-benchmarks)) that community can help running with Hyperbee, since Hyperbee is LevelUP compatible.

We need your help!!

### Hyperswarm

Hyperswarm is a key element of Hypercore system that allows to discover network addresses of the peers by topic names using DHT.

Hyperswarm also allows peer's network address discovery on local network (LAN) via mDNS broadcasts. [nDNS](https://en.wikipedia.org/wiki/Multicast_DNS) is a protocol used by Apple [Bonjour](https://en.wikipedia.org/wiki/Bonjour_(software)) for [AirDrop](https://apple.stackexchange.com/questions/24885/use-the-airdrop-network-to-access-a-computer) and is standardized by RFC 6762.

#### Help me picture use cases for Hyperswarm?

Ideas that fit Hyperswarm's mission to help discover peers and connect to them without using any servers:

- **Decentralized DNS**. This allows to find and establish direct connections to peers. In that way it serves as a P2P variant of DNS. Like DNS it provides network location independence. Like DNS it allows to store small data in location records. Unlike DNS it does not require any configuration. So it is well suited for non-technical users. Unlike DNS it does not depend on a service provider - it is fully decentralized. Actually there is still a dependency on a  list of bootstrap servers, but they are not fixed, like DNS root servers, and any Hyperswarm peer can bootstrap from the bootstrap servers it trusts (see [bootstrap](https://github.com/hyperswarm/hyperswarm#swarm--hyperswarmoptions)).

To be precise, DNS system has another function which Hyperswarm does not replace. DNS is providing a friendly recognizable name for the IP address. We register today this so called domain name via some domain registrar, which is a commercial entity that is working with the root registrar (.com, .io) to rent domain names. This part is [very hard to decentralize](https://en.wikipedia.org/wiki/Zooko%27s_triangle). DHT does not help here. Namecoin was the first to solve Zooko triangle puzzle, and [Ethereum ENS smart contract](https://docs.ens.domains/) is now well on the way to be adopted as a decentralized solution for this problem.

- **Avoid central signaling servers**. For example, a [video chat over WebRTC](https://twitter.com/pfrazee/status/1248744869419458561) requires a [STUN server](https://www.callstats.io/blog/2017/10/26/webrtc-product-turn-server) but with Hyperswarm it is avoided, increasing privacy and avoiding dependency on service providers.

- **Connect to peers sitting behind a firewall**, such as home routers, which otherwise can't otherwise connect directly to each other. This can be used for video chats or any other P2P traffic (Hyperswarm's huge value here is so called NAT hole punching, the algorithm is in [DHT-RPC package](https://github.com/mafintosh/dht-rpc/blob/master/lib/io.js#L47-L68)). Keep in mind this does not work on mobiles (and behind some corporate firewalls), and requires a fallback to a relaying proxy (e.g. This post says [30% of P2P connections need TURN proxy](https://www.callstats.io/blog/2017/10/26/webrtc-product-turn-server)). 

Relaying proxy is a potential loss of privacy point. What if we could use a **personal** cloud peer, not a 3rd party service as such a proxy?

- Server-less Contact Tracing on DHT. See this idea described in detail [in this paper](https://eprint.iacr.org/2020/398.pdf).

- Hyperswarm is also a Publish Subscribe system, in a way.
Need help on this.

#### Can we distinguish between peers before connecting to them?

Need help with this.

No.
Once you write your first Hyperswarm and print all the new peers joining it, you will likely notice all kinds of peers that have nothing to do with you. Who are they? For a website and public media like Twitter or YouTube-style application, it is totally fine. But in a security-focused application you might get concerned.

Any hypercore-savvy person will argue that this is ok, as you will not be sharing any data. To access the Hypercore feeds you still need to know their publicKey. But the fact is, you still need to connect to all peers to figure out if you even want them. This is not efficient and can present some surveillance challenges.

This can be very useful:

- To know if peers are readers or writers, or filter them out with some cryptography-based primitives, and avoid connecting to those that you do not trust.

- Load balancing between peers. It would ridiculous for the Router design to expect the Router to connect to peers to determine who to forward request to.

- Can Sybil attacks and DDOS on DHT, mentioned in [Hyperswarm blog](https://pfrazee.hashbase.io/blog/hyperswarm), be prevented if DHT itself could be selective about the peers?

#### Is Hyperswarm anonymous?

No. Let's explore what is revealed.
Hyperswarm announces IP and Port of the peer to allow other peers in P2P network to connect with them. Hyperswarm's DHT holds that data, so any observer could simply collect this information. The observer will also learn the topic this peer is advertizing. Aside from that no other information is leaked. Is it worse than DNS? In DNS servers also announce their name and address to the world. But clients do not, while in Hyperswarm they do. On the other hand, topic name is more private than in DNS, it is just some hash, not a human-readable name.

So what can be done to protect IP addresses in DHT?

- Hyperswarm can be improved to encrypt data in DHT, and this way only the peers that know some shared secret could find each other.

- Potentially [I2P](https://dat.discourse.group/t/feature-support-i2p/62/6) can be used in the future.

#### Is Hyperswarm susceptible to DDOS?

[Yes](https://pfrazee.hashbase.io/blog/hyperswarm). One potential approach is to have Hyperswarm peers sign data in DHT, and refuse to accept unsigned data. Other measures could include the approach used by Bitcoin, to prove that you have spent some CPU time (e.g. 3-5) when announcing a topic in DHT (crypto-puzzle). This is the area of active research.

A resilience to DDOS could be enhanced by creating a large network of provably legitimate DHT nodes.

The best way to increase anonymity and avoid DDOS would be to amend the DHT to remove IP information after one hop. This is what the SAFE network does with its DHT. In that case, no one participant could get the IPs of most of the network, unless they had a botnet that announced themselves as a "near-neighbor" of most topics.

### Hyperdrive

Hyperdrive provides many of the hard to create components to replicate the functionality of Dropbox and Google Drive. Beaker Browser adds the UI to it.

Hyperdrive is a library and can also [run as a service](https://github.com/hypercore-protocol/hyperdrive-daemon), that is accessible via an API and can show up as a [normal directory on your disk](https://github.com/hypercore-protocol/hyperdrive-daemon#fuse) (this part works on MacOS and Linux, with Windows in works).

#### Can you help me picture use cases for Hyperdrive?

- Dropbox, Google Drive, etc. alternative without a central server. These systems are used by millions of teams and everyone's privacy is compromised. In addition, Hyperdrive adds magic powers of media streaming and bandwidth sharing with peers (Hyperdrive is helped by a companion Hyperspace service (daemon), which runs like a Dropbox service in the background).

- Distributed, replicated file system, an alternative to NFS, Samba/cifs or sshfs. Distributed file system is essential component of Cloud services, e.g. many serverless applications [can't be built without it](https://lumigo.io/blog/unlocking-more-serverless-use-cases-with-efs-and-lambda/). Hyperdrive could provide a better isolation of personal data in a multi-tenant Cloud environment.

- A building block to create a real alternative to Object Storage (S3).

- Distribution of software and large datasets to / from / between Data Centers, as described in [older eBay paper](https://tech.ebayinc.com/engineering/bittorrent-for-package-distribution-in-the-enterprise/), and any case of Big Data fan-out.

#### How can Hyperdrive be shared?

1. Underlying mechanism is built into Hypercore, and works for all data structures that use it: Hyperdrive, Hypertrie and Hyperbee. You can share the read-only version of your whole hypercore with others, by giving them the public key of the Hypercore.

2. Hyperdrive itself is actually 2 hypercores for directory structure and metadata, and for file content. So to share it you use the above URL (need confirmation for that).

3. Hyperdrive also support mounts. It allows to include other people's drives under your your own Hyperdrive as a folder. Mounts are still read-only though, But this allows people to continue editing files on their Hyperdrives and all people that mounted it will see updates in real-time.

4. Hypertrie also supports mounts, which allows a Key-Value store supported by the whole team. [Mountable Hypertrie](https://github.com/andrewosh/mountable-hypertrie) is actually what Hyperdrive uses underneath for mounts.

#### What are the limits on file sizes?

There is no inherent size limits. As a demo Hypercore team put a complete Wikipedia mirror with tens of millions of files on Hyperdrive and it reads very fast.

#### What proves the scalability of Hyperdrive?

The whole of Wikipedia was loaded into Hyperdrive and it provides a decent speed for finding articles. This also stressed Hypertrie, as Hyperdrive used Hypertries for managing file system directory structure and file metadata.

Need help with this: what other public datasets would be good to load into Hyperdrive? How about the whole of the Web?

## What is missing in Hypercore?

Hyperdrive provides many key primitives (lego blocks) needed in distributed systems. But it lacks certain others that you will need to build yourself for a full P2P application, and to avoid frustration it is better to be aware of them upfront.

### Distributed Time / Clocks

To reach the same state peers in distributed systems need to synchronize clocks in view of computer time drift and network disconnects from other peers. Typical solutions include [generation / causal clocks](https://martinfowler.com/articles/patterns-of-distributed-systems/generation.html), and newer hybrid clocks like [HLC](https://jaredforsyth.com/posts/.hybrid-logical-clocks/)).

- Every message, including the heartbeat message needs to carry this time
- Point-in-time recovery and snapshots could utilize this stronger time
- Secure timestamping is necessary for legal documents, copyright, for many forms of compliance, dashboard cameras, gig economy contracts (e.g. state of rental property at entrance), and today can be achieved with [IETF RFC 3161 and 5816](https://www.linkedin.com/pulse/why-secure-electronic-signature-requires-timestamp-ott-sarv/). But it relies on a trusted provider of time. [eIDAS law in Europe](https://blog.eid.as/tag/time-stamping-authority/) requires such Trusted Provider for strong digital signatures to be accepted by the court. In the P2P applications we are always looking to decentralize infrastructure that is currently centralized, and Blockchain is the first and the only known currently [decentralized secure time keeping system](https://grisha.org/blog/2018/01/23/explaining-proof-of-work/). Hypercore community could benefit from it greatly. For example a public service that [proves the time](https://www.jamieweb.net/blog/proof-of-timestamp/) with a 1-day precision could be quite cheap to build, and could itself be built on a Hypercore.

Any volunteers to help us build it?

### Multi-device editing with conflict resolution (CRDT)

- CRDT are a new way for achieving consensus. It is super cool as it allows distributed actors to arrive at the same state, like blockchain nodes, but with transactions that are applied in a different order.
- CRDT must use the above clocks for structured data and for document editing (docs, slides).
- With multiple devices comes a need for per-device key management, key coordination and revocation. Key management in general is missing in Hypercore.

### Collaborative (team) editing with conflict resolution

- Structured data and document editing need different approaches.
- With teams we also need access control.

### Topology management

Devices have different storage capacity (cloud vs mobile, storage durability (e.g. browser vs desktop app vs cloud), and different networks (fast, metered, capped, etc). CPU and RAM capacity might also be factors. Replication and storage management algorithms might take all above into account. For example, for sharing media from mobile, replication algorithm should only upload each block once, to the peers with a better connection.

### Schema / data model / data dictionary

As apps have a need to understand each other. Data modeling emerges as a necessity as automation needs arise, as AI needs to know what data it is trained on, as searching in database needs a guiding UI. If that does not happen, then data models get buried inside the apps. Data models become a top priority in systems that allow users to interact with the data directly. Hypercore leaves this area to what it calls a "userland".

### Identity

Full apps will need some form of identity management. Hypercore provides the basic elements, a keypair per each core (and in corestore master key for corestore and generated keys per core), but identity of a peer is much more than the identity of the core.

### Multi-writer

Hypercore is engineered as a set of small single-purpose primitives (lego blocks) to be highly composable. This is a methodology used by Linux community and it allows to have simple mental model about the building blocks, and to create purpose-made systems. This is opposite to systems that attempt to serve many use cases upfront and become over time very hard to manage and secure. The example is OpenVPN which recently is being replaced with Wireguard and a family of single-purpose modules that are built for it. In Hypercore this approach is especially evident in the case of multi-writer.

Hypercore, and data structures on top (Hypertrie, Hyperbee and Hyperdrive) are single-writer primitives. This means only one private key can have access to write into each.

But when hypercore is replicated to personal devices (phone, tablet, PC, cloud peers) each device needs to have its own private key, which means now multiple writers need to write into hypercore data structures. Same need arises when you want to collaborate with peers, with shared documents, files and databases, as you want peers to **edit** same objects and **search** across them.

To support such use cases multi-writer modules can be composed on top.

*Note that supporting multi-writer in core modules [has been requested many times](https://github.com/hypercore-protocol/hyperdrive/issues/230) but it turns out one size does not fit all. [HyperDB](https://github.com/mafintosh/hyperdb) is an abandoned multi-writer database that became too complex as it tried to provide discovery, networking, authorization, conflict resolution, etc. in one package, serving many masters and satisfying none.**

So simple compositions, that are themselves composable is a better approach, see below:

#### [Multi-hyperdrive](https://github.com/RangerMauve/multi-hyperdrive/)

Allows several nodes share and write to the same drive. This is useful for multi-device support or in a team. It supports not just one, but a set of shared drives. At the moment it provides a simple last-write-wins (LWW) conflict resolution. It scales well on writes, sames as the hyperdrive and adds a fairly small performance penalty on reads (which grows O(n) with the number of drives). Drives are added to the shared set via an API at start. Multi-hyperdrive is network-agnostic. No authorization mechanism for individual files is provided.

Note the difference with hyperdrive mounts. Mounts allow read-only access to peer's drives, while multi-hyperdrive allows both sides to write. With Mounts, the path to a files changes, with a mount point added to it, e.g. drive with path `/parlor` mounted at `/fred` will require need to be accessed via `/fred/parlor`. Multi-hyperdrive will keep the path the same, which is more natural, but it has a downside. If you are sharing between your own devices, this is perfect. But if you are sharing in a team, directory path `fred` may already be used by someone.

#### [co-hyperdrive](https://github.com/RangerMauve/co-hyperdrive)

Builds on top of multi-hyperdrive and allows to add / remove shared drives (writeable bi-directionally) to the set.

#### [Multi-hyperbee](https://github.com/tradle/multi-hyperbee/)

A single replicated hyperbee, not a set, no discovery, networking agnostic, no authorization. Provides convergence to the same state with automatic conflict resolution (CRDT), effectively creating a leaderless multi-master. Scales well on reads (same as hyperbee). Simple, one replicated hyperbee, not a set, no discovery. Network-agnostic, no authorization mechanism.

#### Union

A union of Hyperbees can be [easily constructed](https://github.com/tradle/why-hypercore/blob/master/test/hyperbeeUnion.test.js) utilizing another lego block, [a streaming sort-merge](http://github.com/mafintosh/sorted-union-stream).

Need help with this:

Cobox community has created a number of compositions:

- **[local indexes for remote feeds](https://discordapp.com/channels/709519409932140575/709519410557222964/756414542669676573)**. This approach works well for groups of up to 50 members.
- **KappaDB**. [Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/3_mock-up/technology/architecture.md) produced a multi-writer DB [KappaDB](https://github.com/kappa-db).

### Consensus / converging state

Normally a single person will not be using 2 devices simultaneously. Yet because of the loss of connectivity changes made on each device may need to be merged. This includes documents, filesystems and databases. It becomes much more difficult in multi-user scenarios.

In distributed systems, of which P2P is a subclass, reaching the same state is a hard problem with a long history. The reason it is hard was only recently formally described as a [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem). The holy grail of distributed systems is to reach the [ACID](https://en.wikipedia.org/wiki/ACID) guarantees of SQL databases - Atomicity, Consistency, Isolation and Durability. But SQL databases mostly operated on a single machine or on a closely managed cluster. Over the Internet the connectivity can be spotty and malicious actors abound.

  Handling bad actors became a specialty of blockchains, and it was a huge win for the P2P movement. Yet, since blockchains serve as shared databases for the whole world, they come with limitations. They have high transaction costs, low throughput, can store only the miniscule amounts of data, and can't hold or process private data. To overcome these limitations some applications re-centralize, adding web servers, application servers and DB servers. Others try to remain pure P2P by using IPFS or Hypercore.

Algorithms, that tackle bad connections and reliability issues with compute and storage, **but not bad actors** have evolved from the highly complex Paxos to a simpler RAFT, to PBFT, and finally, in the last 5-7 years, to CRDT. CRDT is very lightweight and allows to operate leaderless multi-master, allowing each master to merging edits on the edge without any central coordination. This means no operators to run central service (Zookeeper, etcd, etc.) and handle complex cluster failure modes. CRDT, combined with HLC clocks, increases throughput with wait-free transaction ordering by avoiding any coordination between masters.

Note that CRDT is quietly being used by AWS DynamoDB and Azure Cosmos - and if it is good enough for those web-scale databases, it is good enough for P2P.

Here is a [great introductory talk](https://www.youtube.com/watch?v=M8-WFTjZoA0) on CRDT (here is [another one](https://www.youtube.com/watch?v=B5NULPSiOGw)) and an [advanced one](https://www.youtube.com/watch?v=PMVBuMK_pJY).

For NodeJS the prime candidate is [Automerge](https://github.com/automerge/automerge), but there are others like [YJS](https://github.com/yjs/yjs) and [Delta-CRDT](https://github.com/peer-base/js-delta-crdts) (please share if you know a better one). [CRDT is implemented](https://github.com/orbitdb/crdts) and used by OrbitDB that runs on top of IPFS.

CRDT matches perfectly multi-device and collaborative editing use cases of P2P:

#### Databases

CRDT provides new data types with **magic properties** that allow automatic merging of independent edits. Anyone who sent Word documents by email to their teammates or lawyers knows the "joys" of redlining. Any developer knows the chores of merging conflicts that Git could not auto-merge. Good news for the humankind, no more conflicts with CRDT. But it also means that we need to adapt our databases to keep history of changes, sequence them properly, use stable IDs of our peers and coordinate clocks. Hypercore multi-writer modules will incorporate CRDTs for this by the end of 2020.

#### Collaborative editing

P2P needs a mechanism to match Google Docs (and Slides, Sheets, Diagrams, etc.) that allow multiple people edit the same document simultaneously. Google Docs uses an older Operational Transforms algorithm that is highly complex and allows only 2 concurrent edits (which Google overcomes by having a central server quietly merging in the background). A special branch of CRDT for sequences (LSEQ is one of them) was developed recently. Hypercore multi-writer modules will incorporate CRDTs for this by Q1 2021.

#### CRDT and cloud peers

Personal cloud "device" is always on. This resolves a common P2P issue when you edited a document, closes your laptop or an app on the phone. Cloud peer can make your changes available for others. But consensus still need to be reached and without a Google in the middle.

- CRDT allows multiple cloud peers to sync with other devices and sync between themselves
- An always-on cloud peer allows CRDT to merge edits from multiple devices in real-time, so that conflicting edits don't accumulate, matching Google experience but without Google reading all our documents.
  
Note that CRDT resolution works smoother when clocks between machines are well synchronized. NTP existed for years, and now there is a new iteration [NTS, published by Cloudflare](https://blog.cloudflare.com/announcing-cfnts/). Normal clocks are not enough though. Need causal clocks too. See more on that later.

### Is Hypercore multi-process-safe?

We know it is single-writer. But can the same writer accidentally screw up the Hypercore while being executed from a second processes on the same machine, like from a Nodejs cluster process or a Nodejs worker thread? If so, it will present a significant design challenge in Serverless environment.

For reference, note that LevelDB is not multi-process safe, but [LMDB is](https://dev.doctorevidence.com/lmdb-in-node-29af907aad6e).

Need help with this.

## Which additional modules, outside of core modules, are notable?

| Module | Author | Description |
| -- | -- | -- |
| **[Hypercore-peer-auth](https://github.com/Frando/hypercore-peer-auth)** | [Franz Heinzmann (@Frando)](https://github.com/Frando) | Verifies that remote hypercore is an original author (is in the possession its secretKey). Also tells you which remote hypercore has just connected to you. This comes useful when you join a hyperswarm topic and get connections from many peers. Hyperswarm itself does not tell you the identity of the peer. Note, that since each hypercore has its own identity (keypair), you can designate one of the hypercores of the peer to represent the identity of the peer. Hypercore-peer-auth module implements an extension to hypercore protocol, and is an example of how you can create your own extensions. Note that there are channel extensions and [stream extensions](https://github.com/hypercore-protocol/hypercore-protocol#stream-message-extensions). Channel is encrypted, so its extensions are secure, not so with stream extensions.
| **[Multi-key](https://github.com/mafintosh/hypercore-multi-key)**|  [Mathias Buus (@mafintosh)](https://github.com/mafintosh) | Allows to rotate a keypair for hypercore |
| **[Streaming sort-merge](http://github.com/mafintosh/sorted-union-stream)** | [Mathias Buus (@mafintosh)](https://github.com/mafintosh) | This works great with several hyperbees. It is composable, so you can use more than 2 hyperbees |

## Where can I learn more about Hypercore universe?

1. Visit the [Hypercore Protocol site](https://hypercore-protocol.org/). 

2. In the summer of 2020 there was a [Dat Conference](https://www.youtube.com/playlist?list=PL7sG5SCUNyeYx8wnfMOUpsh7rM_g0w_cu) (Dat was renamed to Hypercore this year). You can see the breadth of discussions that took place, both on tech and the opportunities.

3. [Workshop at the 2020 summer Hypercore / Dat Conference](https://github.com/RangerMauve/dat-workshop) with sources and video.

4. [Hyperbee 'P2P indexing and search' workshop at the 2020 fall Nodeconf conference](https://github.com/hypercore-protocol/p2p-indexing-and-search)

5. [Kappa workshop](https://github.com/kappa-db/workshop) is a great basic intro, we [forked it](https://github.com/tradle/hypercore-workshop) to update to new materials and shift focus to core Hypercore modules.

6. Read [old FAQ](https://docs.dat.foundation/docs/faq) (before project was renamed from Dat to Hypercore).
