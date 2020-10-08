# Hypercore universe FAQ <!-- omit in toc --> 

Many of the answers below are taken from Hypercore protocol discussion forum. All interpretations are ours, and so are the possible mistakes and misunderstandings. Please send corrections as pull requests, or request commit rights. Questions that need answers are marked with **Need help with this**.

- [General](#general)
  - [What are the main components / modules / packages?](#what-are-the-main-components--modules--packages)
  - [What is the USP (Unique Selling Proposition) of Hypercore?](#what-is-the-usp-unique-selling-proposition-of-hypercore)
    - [Streaming](#streaming)
    - [Common functions of distributed systems](#common-functions-of-distributed-systems)
    - [Large file handling](#large-file-handling)
    - [Bottom line on USP](#bottom-line-on-usp)
  - [What is offline-first local-first software?](#what-is-offline-first-local-first-software)
  - [What is a streaming DB?](#what-is-a-streaming-db)
  - [How is Hypercore different from BitTorrent, WebTorrent?](#how-is-hypercore-different-from-bittorrent-webtorrent)
  - [How is Hypercore different from ScuttleButt (SSB)?](#how-is-hypercore-different-from-scuttlebutt-ssb)
  - [How is Hypercore different from IPFS?](#how-is-hypercore-different-from-ipfs)
    - [more work needed to compare IPFS and Hypercore](#more-work-needed-to-compare-ipfs-and-hypercore)
  - [I wonder what P2P apps can be built on Hypercore?](#i-wonder-what-p2p-apps-can-be-built-on-hypercore)
  - [Does Hypercore have a community?](#does-hypercore-have-a-community)
  - [Why Hypercore is not yet mainstream?](#why-hypercore-is-not-yet-mainstream)
  - [P2P state and evolution](#p2p-state-and-evolution)
  - [Who is using Hypercore P2P framework today?](#who-is-using-hypercore-p2p-framework-today)
  - [How integrity of the data is assured?](#how-integrity-of-the-data-is-assured)
    - [Can Hypercore's author change history?](#can-hypercores-author-change-history)
  - [Is there support for key recovery?](#is-there-support-for-key-recovery)
  - [Is there a regular key rotation and key replacement mechanism?](#is-there-a-regular-key-rotation-and-key-replacement-mechanism)
  - [Is there an authentication system?](#is-there-an-authentication-system)
  - [Is there a discovery system to learn what feeds the other peer shares?](#is-there-a-discovery-system-to-learn-what-feeds-the-other-peer-shares)
  - [Help me picture use cases for Hyperswarm?](#help-me-picture-use-cases-for-hyperswarm)
- [If Hypercore is a P2P Web, what is its URL format?](#if-hypercore-is-a-p2p-web-what-is-its-url-format)
  - [What is the biggest gotcha with Hypercore?](#what-is-the-biggest-gotcha-with-hypercore)
  - [Can Hypercore be backed up?](#can-hypercore-be-backed-up)
    - [Backup to S3](#backup-to-s3)
- [Network](#network)
  - [What are the reliability guarantees of Hypercore protocol?](#what-are-the-reliability-guarantees-of-hypercore-protocol)
  - [Is network traffic encrypted end-to-end?](#is-network-traffic-encrypted-end-to-end)
  - [Is Hypercore push or pull?](#is-hypercore-push-or-pull)
  - [How to discover all feeds that a peer can give us?](#how-to-discover-all-feeds-that-a-peer-can-give-us)
  - [Does Hypercore work in the browser, on mobiles?](#does-hypercore-work-in-the-browser-on-mobiles)
  - [Does Hyperswarm work in browsers, on mobile?](#does-hyperswarm-work-in-browsers-on-mobile)
    - [A companion Personal Cloud node may address privacy and connectivity issues](#a-companion-personal-cloud-node-may-address-privacy-and-connectivity-issues)
  - [Can Hypercore network protocol be extended?](#can-hypercore-network-protocol-be-extended)
- [Storage](#storage)
  - [Can Hypercore storage be encrypted at-rest?](#can-hypercore-storage-be-encrypted-at-rest)
  - [Does Hypercore support zero-knowledge store / blind storage?](#does-hypercore-support-zero-knowledge-store--blind-storage)
  - [Does Hypercore support erasure-coding?](#does-hypercore-support-erasure-coding)
  - [Can data be deleted?](#can-data-be-deleted)
- [Hypercore components / modules](#hypercore-components--modules)
  - [Hyperbee](#hyperbee)
    - [Help me picture use cases for Hyperbee?](#help-me-picture-use-cases-for-hyperbee)
    - [How does Hyperbee relate to Hypercore?](#how-does-hyperbee-relate-to-hypercore)
    - [What are the limitations on consistency?](#what-are-the-limitations-on-consistency)
    - [Can it serve as LevelDB replacement?](#can-it-serve-as-leveldb-replacement)
    - [What proves the scalability of Hyperbee?](#what-proves-the-scalability-of-hyperbee)
  - [Hyperswarm](#hyperswarm)
    - [Can we distinguish between peers before connecting to them?](#can-we-distinguish-between-peers-before-connecting-to-them)
    - [Is Hyperswarm anonymous?](#is-hyperswarm-anonymous)
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
- [How are above issues handled today in Hypercore?](#how-are-above-issues-handled-today-in-hypercore)
  - [Filesystem workaround](#filesystem-workaround)
  - [Union of Hyperbees?](#union-of-hyperbees)
  - [Practical conflict resolution for common use cases](#practical-conflict-resolution-for-common-use-cases)
  - [Simulated multi-writer on top of multiple single-writers](#simulated-multi-writer-on-top-of-multiple-single-writers)
  - [Is it multi-process-safe?](#is-it-multi-process-safe)
- [Where can I learn more about Hypercore universe?](#where-can-i-learn-more-about-hypercore-universe)

## General

This section is for general questions. See other sections for questions specific to individual Hypercore modules.

### What are the main components / modules / packages?

- **Hypercore protocol**, [network protocol](https://www.datprotocol.com/deps/0010-wire-protocol/), providing messaging and peer data exchanges. 
- **Hypercore**, append-only-log that can be used as-is, and is also used as a building block for other data structures. Hypercore is similar to block storage in Data Centers.
- **Hypertrie**, a key-value store, which uses the underlying Hypercore and is used by other higher level services, like Hyperdrive for its directory structure and the file metadata. You can view key-value store as a simplest possible database and it is a common component in modern applications, and especially as embedded part of P2P applications. E.g. Ethereum uses KV store for [smart-contract storage](https://medium.com/hackernoon/getting-deep-into-ethereum-how-data-is-stored-in-ethereum-e3f669d96033).
- **Hyperbee**, a key-value store, that also provides sorted range queries and therefore can be used by the database on top to build indexes.
- **Corestore**, to managing many Hypercores you typically end up authoring or replicating from others.
- **Hyperdrive**, a P2P alternative to Google Drive and Dropbox 
- **Beaker Browser**, a full-blown browser that also supports the Web without servers (P2P Web).

### What is the USP (Unique Selling Proposition) of Hypercore?

Hypercore is Open Source, it is not selling, but it is offering itself to developers. So what is it that is absolutely unique about it? It is P2P, but we saw other P2P technologies, BitTorrent and Bitcoin.

#### Streaming

Hypercore's key USP is **streaming**. You can think of it as video streaming, but now for videos and also filesystems, databases, messages, IoT signals, and any other structured data constructs. With streaming, you get:

- **Almost immediate access**, even though the data is not yet fully downloaded or may never need to be fully downloaded
- **Higher security**, as it provides the integrity and authentication guarantees for each data element on the wire. A typical database, file and messaging servers base most of their security on the initial connection establishment. This is a huge leap!
- **Higher scalability**, as you shove your streaming database in S3 and let billion people use it.

This point needs to be repeated again and again, as streaming data, just by itself, without any other wonderful Hypercore capabilities, may create a new class of applications, much like Netflix re-invented the movie watching. This paradigm shift is one reason why Hypercore is hard to grok for app developers, it just requires full rethinking of our current architectures.

Note, when reading Hypercore docs you will find many references to Sparse files and sparse DB. This is the capability used for streaming, that is a peer can efficiently request individual blocks from remote peers, instead of loading the whole thing, be it a video file or a database.

#### Common functions of distributed systems

Another USP of Hypercore is that it implements essential patterns of distributed systems in a reusable way, so that systems and applications are not forced to re-invent the wheel.

**WAL**.All distributed systems need a [Write Ahead Log (WAL)](https://martinfowler.com/articles/patterns-of-distributed-systems/wal.html), be it databases, orchestration engines, like Zookeeper or etcd, or event streaming systems like Kafka. Every system implements its own WAL today. Hypercore generalized this pattern as an append-only-log and consistently uses it in its higher-level data structures such as Hypertrie, Hyperbee, Hyperdrive.

**History**. Same goes for other patterns like point in time recovery, snapshots, versioning, undo-redo and rewinds, and data integrity assurance. Non-distributed apps can also benefit from these capabilities. For example, it is great for experiments or risky operations, as you can always go back to the previous state (this is a common pattern with VM snapshots, disk snapshots, container image layers).

#### Large file handling

Many applications (like chat, group chat, photo apps, social media apps and collaborative apps) need an ability to handle file sync, especially for very large media files. Hypercore is geared really well to enable these.

#### Bottom line on USP

Distributed apps need these and therefore apps using hypercore become simpler to write.

Need help with this:
how would one implement in Hypercore as message with a large video forwarded from one chat to another (both in singular and a group chat).

### What is offline-first local-first software?

Take a look at [Jared Forsyth's criteria](https://jaredforsyth.com/posts/in-search-of-a-local-first-database/) for the above and the various products he reviewed using these criteria. The framework for this type of software is very hard to create, but it is a fresh direction away from massive aggregation of our personal data, and it is close to become a reality. Isn't it why you are here?

Hypercore is built to give you full control of your data. This means, it continues to work even when you have no connectivity, when your other peers are offline, and when hosting / cloud provider closes your account. It also allows portability to other machines or hosting providers.

Note for example, that Google Docs only has support for offline work in Chrome, but not in other browsers. This is how these services tie you up. The new phenomenon is de-platforming, when app provider, like Twitter closes your account, or App Store blocks your app downloads. Facebook and Twitter famously killed rich ecosystems of apps on their platforms.

By relying on providers without a mobility we give up on self-sovereignty and core freedoms and become slaves of the platforms, morphing our behavior to their demands, and facilitating creation of mass surveillance systems, like happened with WeChat and other platforms in China.

### What is a streaming DB?

There is a new hot area in Big Data world for querying static databases. In AWS it is Athena, based on Apache Presto engine, and SQL SELECT. CSV Files (or files in JSON, Parquet, ORC, Avro formats) are shoved into S3 and then queried by Serverless applications and by Business Intelligence packages like Tableau.

This requires no databases servers and shows where Hyperbee can be very useful. 

What other applications that can we think of that can be enabled by such a server-less DB, a DB that redefines how querying is done (via sparse data propagation), a DB that embeds a replication mechanism?

Some pointers to possible answers can be found when we compare a P2P source control system Git that replaced SVN and CVS which used central server. Those entrepreneurs that think "Is it possible to make a big business on this?", please note that Microsoft bought Github for $7.5B.

### How is Hypercore different from BitTorrent, WebTorrent?

**BitTorrent**. Hypercore can do what BitTorrent does and more. Hypercore can do discovery and accelerated file download with bandwidth-sharing like BitTorrent, that is, the more viewers watch, the better it works.

But Hypercore can do more - it is built as a data and communications framework for modern decentralized applications.

1. Applications need data structures. Hypercore provides append-only log, Hypertrie key-value store, Hyperbee database and Hyperdrive filesystem.
2. Hypercore support data editing as a design principle. [BitTorrent enhancement BEP 46](https://news.ycombinator.com/item?id=17306106) exists for updating files, but it does not allow updating a record in a database, so is not suitable for applications.
3. It provides full data add/edit version history which allows auditing, point-in-time-recovery, and state snapshots.
4. It provides sparse download like BitTorrent, but extends it to databases.
5. Hypercore has data access authentication.
6. Hypercore has network encryption.

**WebTorrent**. WebTorrent is awesome, it pioneered BitTorrent in browsers and its is a great success, but its mission statement was just that, a BitTorrent for the Web.

Note that WebTorrent's tech can be helpful to Hypercore, as it perfected peer discovery (via DHT) on the Web and it allowed a number of innovative streaming clients to emerge, which could be helpful for Hypercore applications, like Beaker Browser.

### How is Hypercore different from ScuttleButt (SSB)?

- SSB is a peer-to-peer network for streaming feeds of JSON objects. Its primary data-structure is the "feed."
- SSB is not suited for streaming, as it does not have a sparse data structure (enabled in Hypercore by Merkle trees, while SSB uses linked lists).
- SSB uses a gossip protocol to sync data between peers. It does not automate peer discovery for a given dataset (e.g. via DHT) so topology must be manually managed. Hypercore uses a DHT to automate discovery of peers for exchanging of data.
- SSB is primarily focused on social media applications. Hypercore has been growing towards a more generic model of structured data (file systems, databases) spread and synchronized over many devices.

### How is Hypercore different from IPFS?

Both are cool open source P2P data projects that have existed for roughly the same 5-7 years.

You can review Reddit discussion that makes [some good points](https://www.reddit.com/r/ipfs/comments/glnra9/hypercore_protocol/).

Some key differences, [described here](https://www.datprotocol.com/deps/0002-hypercore/), are:

- Mutability. From the start IPFS was designed as an immutable storage, while Hypercore was designed as a mutable storage. In Hypercore editable content was a prime design objective, supported by the internal data structures, its protocol, Change Data Capture system, APIs, etc.

- Discovery. Both IPFS and Hypercore use DHT for discovery nowadays. This allows avoiding dependency on a more centralized DNS system. But they use DHT very differently. IPFS is more like BitTorrent, puts individual file reference in DHT, specifically the hash of file's contents (content-addressed). Since hash changes with file modifications, IPFS added a naming system [IPNS](https://docs.ipfs.io/concepts/ipns/#example-ipns-setup) so that the name in IPNS points to the file's latest version's hash. In Hypercore discovery is at higher level, to avoid overloading DHT. By default, the whole drives (Hyperdrives with potentially millions of files) are addressed via the DHT, URL of the file becomes drive/file. In addition, Hyperswarm service provides a flexible mechanism to design your own DHT-based discovery system, e.g. discover communities, teams, people, etc.

- Directory structures and file metadata. IPFS simulates directories by creating files with links to other files. Hypercore does full file system emulation and therefore can be mounted natively (via FUSE) to be viewed in File Explorer, Finder and to be used from the command line as a normal file system.

- File metadata. 
- Neither [IPNS](https://docs.ipfs.io/concepts/ipns/#example-ipns-setup) nor Hypercore's Beaker URL have human-friendly addresses.

Some notes on IPFS goodies:

- [IPNS has has captured imagination of Ethereum community](https://blog.infura.io/an-introduction-to-ipfs/) to build fully decentralized apps, as most blockchain apps today still keep data and processing centralized.
- IPFS project has produced solid core libraries, like libp2p, solving many of the same issues as Hypercore's Hyperswarm.
- IPFS has implementations in a number of languages, while Hypercore is only in JavaScript. Rust implementation was recently started and hopefully will lead to overall health of Hypercore, forcing better documented specs and more test-suits.
- IPFS team runs a number of public servers that help make the network more usable.

#### more work needed to compare IPFS and Hypercore

Review these and structure its content for summary below:
https://medium.com/decentralized-web/comparing-ipfs-and-dat-8f3891d3a603
https://blog.cloudflare.com/e2e-integrity/
https://docs.ipfs.io/concepts/usage-ideas-examples/#usage-ideas-and-examples

Rough outline: 

- Availability. See for example [Our Networks](https://ournetworks.ca/) page referring to both IPFS and Dat URLs and Dat URL does not open. Same [here](https://2019.ournetworks.ca/).
- Sparse loading
- Support for streaming 1) live streaming, 2) recorded content 3) or just sharing a video on a messenger app.
- Integrity - See section on one Hypercore integrity. But how is the integrity of the multiple feeds achieved, e.g. metadata and content feeds in Hyperdrive, or composite feeds like multi-hyperdrive? 
How does IPFS support data integrity? 
- Granularity, not just files, e.g. with Hypercore you can do live updates in the UI in Hypercore, like Gmail does it.
- Does IPFS support connection Multiplexing? Hypercore has sessions with forward secrecy.
- DHT differences with IPFS?
- how is NAT traversal different?
- HTTPS and other gateways to provide access when other things do not work. For example, see discussion on Hypercore not working on [campus network](https://github.com/datproject/discussions/issues/87).
- Download progress and health of seeded data. See [discussion here](https://github.com/datproject/discussions/issues/81). How does IPFS handle it?
- Docs availability and depth
- Sparse. Diff with how IPFS support sparse
- Bandwidth sharing. How does IPFS support it?
- Multiplexing one connection. Secure Session management.
- Pinning of files and dirs in IPFS. How management of local cache compares to Hypercore
- Addressing / swarming individual files vs Drives (vs Peers?). IPFS uses a DHT for every single data chunk globally, for global dedup. However, IPFS architecture creates an enormous overhead of DHT traffic compared to the other protocols. It also fails to benefit from the assumed knowledge that peers who have one chunk of the repository you’re interested in, are likely to also have more chunks you’re interested in.
- URL to individual data elements: File, Resource in the database.
- Change Data Capture - does not exist in IPFS, attempts are being made to create something for 4 years
- PubSub
- Databases. OrbitDB, ThreadDB, AvionDB.https://medium.com/@rossbulat/orbitdb-deploying-the-distributed-ipfs-database-with-react-79afa1a7fabb
  Wasn't IPFS was designed just for files? How can it support DBs?
- S3: https://docs.ipfs.io/concepts/usage-ideas-examples/#aws-s3-integration
- Hosting - https://docs.ipfs.io/concepts/usage-ideas-examples/#ipfs-hosting-with-textile
- Mobile support https://twitter.com/jarredsumner/status/1223633060551225344
- How to build chat and other apps on IPFS and Hypercore
- Git on IPFS or Hypercore. How P2P supports Git: https://www.ctrl.blog/entry/git-p2p-compared.html

### I wonder what P2P apps can be built on Hypercore?

Need help with this.
Meanwhile take a look at ideas [listed by IPFS community](https://docs.ipfs.io/concepts/usage-ideas-examples/):

### Does Hypercore have a community?

Yes. Community is very active and helps newcomers and developers building on Hypercore. [Join it on Discord](https://discord.com/invite/ga5hxGf), open [issues on Github](https://github.com/mafintosh/hypercore), and follow core developers on Twitter [@mafintosh](https://twitter.com/mafintosh), @pfrazee, and @andrewosh.

### Why Hypercore is not yet mainstream?

It is a fact that Hypercore is 7 years old and still has no runaway apps built on it. So what gives, if it is so amazing, and it is! Here is my take, aside from a general statement that making a P2P framework work smoothly is super-hard:

Many P2P apps struggle as they lack availability, durability and work in the unforgiving networking environments.

- **Availability**. For example, in a P2P collaborative editing app competing with Google Docs, once you close your laptop, your collaborators can't get your latest content, unless they were online when you made edits. With Google Docs, if you had a connection at the time of the last edit, the changes are available to others, even if you went offline right after. This is especially important for team work across the timezones. So some master nodes that "seed" the content are always needed in P2P applications (e.g. Hashbase), but these so called super-nodes often re-centralize things and introduce challenges for permissioning, data sovereignty, and data privacy. Availability problem remains unsolved.

- **Durability**. We are spoiled with Google (and others) taking care of preserving our content. We pay a steep price of giving them everything on us, but this convenience is very hard to achieve in P2P world. Your peers may be good friends but there is no guarantee they will not lose your precious content. Many solutions are being tried, including those with Cryptocurrencies incentivizing users to keep content, but they all have technical and convenience frictions. Besides, who wants to be responsible for disseminating a potentially illegal content? Durability problem remains unsolved.

- **Networking**. Current Internet, with its routing and firewalling system is just hostile to P2P connections. Although Hypercore's Hyperswarm offers an ingenious NAT hole punching, there are too many edge cases, when it does not work on mobiles, it needs workarounds in browsers and is often blocked by VPNs and corporate firewalls. This does not mean it can't be used, we just need a fallback to a trusted server acting as a proxy. But this comes at the same price of decentralization. Reliable Networking remains unsolved.

Is there an answer to those perpetual problems of P2P? We believe there is. In crypto world the answer was found with the notion of miners. This is why some P2P projects are attempting to repeat this approach introducing their own blockchains. IPFS team's Filecoin, Storj, Theta.tv and a number of others are examples. But they are all focused on data storage.

Hypercore is so much more. It is a foundation ford apps, that is storage, content distribution, compute, messaging, networking, analytics, AI, etc.

We believe the answer is not in copying the mining model and offering crypto-incentives. The answer we believe is a Personal Cloud, your always-available durable peer, a companion to your less-capable personal devices, a place to run many Hypercore apps that can't run on personal devices. We believe Personal Cloud will make Hypercore shine.

### P2P state and evolution

Both classes of P2P systems, blockchains and P2P data are nudging towards mass market adoption. Cryptocurrencies made huge strides in creating a new foundation for global financial system, especially evidenced by the rise of DeFi in 2020.

In addition, many new projects are employing tokens as incentives mechanisms to avoid points of centralization that exist today. Examples are VPN (Orchid), Routing (PKT + CJDNS), social media (Steam), live streaming (Theta.tv), Web Browsing (Brave), Storage (StorJ, IPFS FileCoin). Several high-profile projects were shut down (Telegram TON) or have hit high resistance from governments (Facebook Libra).

Crypto-currency P2P projects are a huge step ahead of data-centric P2P projects like Hypercore and IPFS, as they have found their native hosting model, in the form of miners. This makes them independent of the Cloud providers, which is essential for their survivability in the face of regulatory scrutiny.

P2P Data projects do not experience such a resistance, but they have not invented their own sustainable infrastructure. IPFS is looking to Filecoin to incentivize storage providers, while meanwhile subsidizing hosting via ipfs.io.

Hypercore community has produced Hashbase, Homebase, DatDot and other hosting solutions, but they have not reached significant maturity and adoption. Could Personal Cloud be the answer (shameless plug)?

Almost every P2P project is still largely held back by numerous overlapping infrastructure needs for this novel tech to hit a wider market. E.g. one common problem is the management of the ownership keys.

The difference between Hypercore and IPFS is that it has moved relatively slowly with its marketing. The core team chose to patiently and somewhat stealthily build the foundational technology and avoid starting the "hype cycle", that is until it is ready for prime time. Initial releases of Hypercore (then called "Dat") in 2016-2018 had scaling issues, which have been addressed by subsequent releases.

Specifically, Hypercore team focused on the performance of its unique "streaming database" design (see below). Team prepares for marketing push at the end of this year (2020), starting with the Beaker ecosystem (Beaker is the Web and P2P Browser and authoring platform built on Hypercore)

### Who is using Hypercore P2P framework today?

Need help with this.

Partial answer is:

Each project building on Hypercore is stretching its flexibility and contributes back solutions that are not yet available in the core. Then Hypercore team generalizes them and makes available for everyone. See some of the projects and their notable contributions:

- Bitfinex, major crypto exchange, uses:
  - Hyperswarm in their microservices framework [Grenache](https://github.com/bitfinexcom/grenache). Bitfinex helped extend Hyperswarm DHT to improve peer discovery. Bitfinex also pushed the envelope with Hypercore team on creating the first payments framework for Hypercore.
  - Hyperbee to deliver [streaming data and signals](https://blog.bitfinex.com/dazaar/backtest-your-trading-strategies-with-bitfinex-terminal-honey-framework/) for backtesting trading strategies. Hyperbee allows Bitfinex to create a community of free and paid providers of trading signals that seed structured data like BitTorrent seeds files. 
- [Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/2_work-plan/mvp/mvp-design.md), focused on enabling teams. Cobox community created a KappaDB and collaborative editing.
- [Peermaps](https://peermaps.org/), building P2P alternative to Google Maps based on OpenStreetMap
- [Sonar](https://arso-project.github.io/sonar-book), distributed media archives on Hypercore. Note an interesting [bulk update](https://discordapp.com/channels/709519409932140575/727886901100675083/755723909709561856) feature discussion re:Sonar, which sounds like addressing a pain similar to serverless apps.
- See at the bottom of [Hypercore protocol page](https://hypercore-protocol.org/)
- See discussion forum where people [showcase their Hyper projects](https://discordapp.com/channels/709519409932140575/712037351244955809/712037741126221924).

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

### Is there a discovery system to learn what feeds the other peer shares?

Yes. Managed by Corestore, or by the community-provided multifeed.

Need help with this.

### Help me picture use cases for Hyperswarm?

Ideas that fit Hyperswarm's mission to help discover peers and connect to them without using any servers:

- establish a [Video chat session over WebRTC](https://twitter.com/pfrazee/status/1248744869419458561), which otherwise needs a [STUN server](https://www.callstats.io/blog/2017/10/26/webrtc-product-turn-server). Peersockets module adds convenience and efficiency for [talking to peers on a swarm topic](https://github.com/andrewosh/peersockets).

- connect to peers sitting behind home routers, which otherwise can't connect to each other. (Hyperswarm's here is so called NAT hole punching). Keep in mind this does not work on mobiles (and behind some corporate firewalls), and requires a proxy (e.g. This post says [30% of P2P connections need TURN proxy](https://www.callstats.io/blog/2017/10/26/webrtc-product-turn-server)). Our idea is to use not a public server, but a Personal Cloud as such a proxy, to avoid loss of privacy.

- DNS replacement. E.g. a client app needs to find a server and wants to avoid a centralized DNS, or just avoid a reliance on yet another service, if DHT is already used anyway. Same when Router / balancer needs to find a particular server. See one possible design for [DHT as a decentralized DNS in 2 round-trips](https://github.com/hallettj/my-dns/blob/942370cb2052f0d020564b64710e30ddc92ee5ef/uunet.markdown).

- Server-less Contact Tracing on DHT. See this idea described in detail [in this paper](https://eprint.iacr.org/2020/398.pdf).

- Hyperswarm is also a Publish Subscribe system, in a way.
Need help on this.

## If Hypercore is a P2P Web, what is its URL format?

URL is designed to be used in Beaker. Its schema is `hyper://<public-key>[+<version>]/[<path>][?<query>][#<hash>]` where `public-key` is the address of the hypercore feed, `version` is an optional numeric identifier of a specific revision of the feed, and `path` `query` `hash` are fragments akin to HTTP URLs (though `query` has no defined interpretation).

The `version` identifier gives a weak guarantee of the content (it is likely but not fully guaranteed that a versioned URL will provide the same data). There is a proposal for [Strong linking](https://github.com/mafintosh/hypercore-strong-link) which would include a content-hash in the URL, providing the strong guarantee of content. (If strong links do not become part of the URL spec, they may still be leveraged in separate channels, such as manifest files which record the "strong link" hashes along with the target URL.)

When supported, I think such URL needs to have both stable part and version part. It also needs to allow URLs to be used by internal components and apps, not just in Beaker. A typical use case for this is link from a data element in Hyperbee to a file on Hyperdrive.

### What is the biggest gotcha with Hypercore?

Need help with this. @RangerMauve?
Probably copying the Hypercore's directory to another machine and copying a private key and trying to write into this Hypercore while making updates in the original Hypercore.

### Can Hypercore be backed up?

Yes. see [Hypercore archiver](https://awesome.datproject.org/hypercore-archiver) as a starting point, but more work is needed:

#### Backup to S3

Backup to s3 is not supported yet. This [underlying module's](https://github.com/random-access-storage/random-access-s3) dows not have the write method implemented yet. This is work in progress, tracked by [this issue](https://github.com/tradle/why-hypercore/issues/1).

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

### Is Hypercore push or pull?

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

#### A companion Personal Cloud node may address privacy and connectivity issues

TBD

### Can Hypercore network protocol be extended?

Yes. The [protocol](https://github.com/hypercore-protocol/hypercore-protocol) is formalized with protobuf and supports [defining extensions](https://github.com/hypercore-protocol/hypercore-protocol/#stream-message-extensions).

See community video that explains the [Extensions system](https://youtu.be/HyHk4aImd_I?list=PL7sG5SCUNyeYx8wnfMOUpsh7rM_g0w_cu&t=4379). Community projects like Cobox and others are using it already.

Possibly useful are [abstract-extension](https://github.com/mafintosh/abstract-extension) and [hypercore-extension-rpc](https://github.com/mafintosh/hypercore-extension-rpc).

## Storage

### Can Hypercore storage be encrypted at-rest?

Yes, offered by community solutions. You will need explore their limitations. See some below:

- [Cobox Hypercore Encryption](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/2_work-plan/mvp/mvp-design.md).

- [hypercore-encrypted](https://www.npmjs.com/package/hypercore-encrypted), a wrapper around hypercore.

### Does Hypercore support zero-knowledge store / blind storage?

Yes, offered by community solutions. 
the above terms refer to an encrypted replica kept by a friend or a services provider, like [SpiderOak](https://spideroak.com/one/), but can't be read by them.

Current solutions are provided by the community:

- [ciphercore](https://github.com/telamon/ciphercore)
  
- [Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/3_mock-up/technology/architecture.md)

### Does Hypercore support erasure-coding?

No.
Erasure coding is used to recover data from a subset of overall amount of replicas.
Open Source S3-compatible object storage, e.g. provided by [Min.io](https://docs.min.io/docs/minio-erasure-code-quickstart-guide.html) has erasure coding.
Cloud providers sometimes offer a virtualized file system over multiple replicas. Open Source Ceph offers it and so does AWS with EFS (note that Ceph is not easy to manage).

### Can data be deleted?

[Somewhat](https://discordapp.com/channels/709519409932140575/709519410557222964/755404488415772746) - you can [clear() your content locally](https://github.com/hypercore-protocol/hypercore#feedclearstart-end-callback), but if someone replicated it already, you can’t force them to clear. Also, internal data integrity records are still kept, but they do not leak any data (Merkle tree hashes are kept, so you can keep appending data to your log even if you clear the contents). Use cases:

- Chat. You can delete a chat message locally. To delete the chat message at recipient(s) need to send a custom some message “please delete this”.
- Mobile. You can delete photos from mobile to save space, but keep them on a replica (your other PC or a Personal Cloud).

## Hypercore components / modules

### Hyperbee

#### Help me picture use cases for Hyperbee?

A database that is automatically syncing between all personal devices, but without the help of Apple, Google or any other central provider. For Cloud this could be a serverless personal-use replacement for AWS DynamoDB (Azure Cosmos, etc.), while providing **complete isolation** in multi-tenant environment. Some use cases:

- Multi-device Contact list.
- Multi-device Calendar.
- Multi-device Bookmarks.
- Multi-device list of installed apps and their respective settings.
- Multi-device chat and group chat. See [Cabal](https://cabal.chat/), an attempt to do just that.
- Multi-device email front-end? It is a tall order, but we do need to stop giving Google all our mail.

Use cases for embedded replicated streaming DB are plentiful.
Need help with this.

#### How does Hyperbee relate to Hypercore?

Hyperbee uses Hypercore as an underlying storage and a replication mechanism. The cool thing is that one replication stream [can carry many Hypercores](https://discordapp.com/channels/709519409932140575/709519410557222964/755415844808556594), which can carry Hyperbees, Hypertries, and Hyperdrives. 

To manage multiple hypercore feeds, with permissions, use the corestore.

#### What are the limitations on consistency?

This is a trick question :-) Hyperbee, like any other Hypercore-based data structure is single-writer. That means when it is replicated, it is replicated as-is, and eventually reaches the same state.

#### Can it serve as LevelDB replacement?

Yep. Needs to be wrapped into [Hyperbeedown](https://github.com/andrewosh/hyperbeedown) and fed into [LevelUP](https://github.com/Level/levelup).

This is awesome as there are many databases that work on top of the LevelUP API exposed by LevelDB. One example is AWS DynamoDB emulation on top of LevelDB. See its [replacement with Hyperbee](https://github.com/tradle/dynalite/). Some tests are still failing, but it is getting there.

#### What proves the scalability of Hyperbee?

Hyperbee is still in Alpha, but perhaps we can stress-test it on loading the whole of the Ethereum blockchain and indexing it in different ways. This Hyperbee could provide a valuable service to the community. We could even put its snapshots in S3 and let it be streamed. Note that Google BigTable [provides this service](https://cloud.google.com/blog/products/data-analytics/introducing-six-new-cryptocurrencies-in-bigquery-public-datasets-and-how-to-analyze-them).

There is also a number of benchmarks for LevelDB (e.g. [here](https://github.com/maxogden/leveldb-benchmarks)) that community can help running with Hyperbee, since Hyperbee is LevelUP compatible.

We need your help!!

### Hyperswarm

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

Now, Hyperswarm announces IP and Port.

- Potentially [I2P](https://dat.discourse.group/t/feature-support-i2p/62/6) can be used in the future.

- Or perhaps DHT data in the future can be encrypted, to be decrypted only ny those who have permission?

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

Hyperdrive provides many key primitives needed in distributed systems. But it lacks certain others that you will need to build yourself for a full P2P application, and to avoid frustration it is better to be aware of them upfront.

### Distributed Time / Clocks

To reach the same state peers in distributed systems need to synchronize clocks in view of computer time drift and network disconnects from other peers. Typical solutions include [generation / causal clocks](https://martinfowler.com/articles/patterns-of-distributed-systems/generation.html), and newer hybrid clocks like [HLC](https://jaredforsyth.com/posts/.hybrid-logical-clocks/)).

- Every message, including the heartbeat message needs to carry this time
- Point-in-time recovery and snapshots could utilize this stronger time
- Secure timestamping is necessary for legal documents, copyright, for many forms of compliance, dashboard cameras, gig economy contracts (e.g. state of rental property at entrance), and today can be achieved with [IETF RFC 3161 and 5816](https://www.linkedin.com/pulse/why-secure-electronic-signature-requires-timestamp-ott-sarv/). But it relies on a trusted provider of time. [eIDAS law in Europe](https://blog.eid.as/tag/time-stamping-authority/) requires such Trusted Provider for strong digital signatures to be accepted by the court. In the P2P applications we are always looking to decentralize infrastructure that is currently centralized, and Blockchain is the first and the only known currently [decentralized secure time keeping system](https://grisha.org/blog/2018/01/23/explaining-proof-of-work/). Hypercore community could benefit from it greatly. For example a public service that [proves the time](https://www.jamieweb.net/blog/proof-of-timestamp/) with a 1-day precision could be quite cheap to build, and could itself be built on a Hypercore.

Any volunteers to help us build it?

### Multi-device editing with conflict resolution (CRDT)

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

## How are above issues handled today in Hypercore?

Multi-writer is probably the [most wanted feature](https://github.com/hypercore-protocol/hyperdrive/issues/230) of Hypercore, as it is a common pattern of working with files and databases today. Unfortunately today Hypercore is strictly a single-writer system.

The advantage of single-writer is a strong verifiable integrity.

For example, in Tradle's digital identity product a single-writer is a core pattern. No record in Tradle can be edited other then by it's author. The schemas / data models are shaped intentionally to support this single-writer approach. Result is a much safer Data Governance with a cleaner audit trail.

But in Tradle you can still search across all records created by single-writers, as you would expect in any database nowadays. In Hypercore this requires multiple workarounds, like below:

### Filesystem workaround

Hypertrie now provides Mounts which allow to present other people's drives as your read-only subfolders. This is a good workaround, but not a shared filesystem like NFS.

[Multi-hyperdrive](https://github.com/RangerMauve/multi-hyperdrive/) is a new package that achieves impressive results for multi-writer Hyperdrive. See also co-hyperdrive from the same author that adds authorizations.

### Union of Hyperbees?

Maybe [streaming sort-merge mechanism](http://github.com/mafintosh/sorted-union-stream) can help? See the tests that show this [method working](https://github.com/tradle/why-hypercore/tree/master/test).

But will it be performant across millions of Hyperbees? Like on an e-commerce site, a merchant would search for orders from a million people, each with its own Hyperbee? Instead of a union in this case we will need to merge data from the individual Hyperbees, into the merchant's Hyperbee.

Cabal / Cobox / Kappa have gained some experience with [re-indexing of multiple remote feeds in a local feed](https://discordapp.com/channels/709519409932140575/709519410557222964/756414542669676573) and their approach works for groups but does not scale for e-commerce use cases.

### Practical conflict resolution for common use cases

There are cases when CRDT algorithm is more suitable than database concurrency. CRDT is implemented by [Automerge](https://github.com/automerge/automerge), and used by [Hypermerge](https://github.com/automerge/hypermerge). It is also independently implemented by [YJS](https://github.com/yjs/yjs) and [Delta-CRDT](https://github.com/peer-base/js-delta-crdts). Such cases are:

- **Collaborative editing**. A P2P Google Doc alternative allowing document to be edited by multiple people simultaneously. 
  
- **Multi-device support**. Each device is a single writer with unique key per hypercore. Normally a single person will not be using 2 devices simultaneously. Yet because of the loss of connectivity changes on two devices may need to be merged, and CRDT is ok for that. Besides, with the help of always-on Personal Cloud and real-time replication in Hypercore the conflicts would arise rarely.
  
- **Multiple Replicas of a Personal Cloud** are needed for durability, availability and load-balancing. Again, like with multi-device, each replica is a single-writer with its own private key. But this case has higher concurrency potentially, as in serverless environment 2 concurrent writes may occur. Yet, if those writes come from the devices of the same person, conflict CRDT resolution should be sufficient. 
  
Note that CRDT resolution is much better if clocks between machines are well synchronized. NTP existed for years, and now there is a new iteration [NTS, published by Cloudflare](https://blog.cloudflare.com/announcing-cfnts/).

### Simulated multi-writer on top of multiple single-writers

[Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/3_mock-up/technology/architecture.md) produced a multi-writer DB [KappaDB](https://github.com/kappa-db).

[HyperDB](https://github.com/mafintosh/hyperdb) is an older Hypercore project which is a multi-writer database, but it is not seeing any support anymore, presumably as it could not be made performant, but it may still help some apps before a replacement comes in (need confirmation).

[Multi-Hyperdrive](https://github.com/RangerMauve/multi-hyperdrive). A very clever yet simple multi-writer hyperdrive implementation.

As you see it is not a problem that has a generic solution in Hypercore. But maybe instead of focusing on Hyperdrive or a DB we should focus on the use case, specifically a [single-user multi-device use case](https://github.com/tradle/why-hypercore/issues/7).

### Is it multi-process-safe?

We know it is single-writer. But can the same writer accidentally screw up the Hypercore while being executed from a second processes on the same machine, like from a Nodejs cluster process or a Nodejs worker thread? If so, it will present a significant design challenge in Serverless environment.

For reference, note that LevelDB is not multi-process safe, but [LMDB is](https://dev.doctorevidence.com/lmdb-in-node-29af907aad6e).

Need help with this.

## Where can I learn more about Hypercore universe?

1. Visit the [Hypercore Protocol site](https://hypercore-protocol.org/). 

2. In the summer of 2020 there was a [Dat Conference](https://www.youtube.com/playlist?list=PL7sG5SCUNyeYx8wnfMOUpsh7rM_g0w_cu). You can see the breadth of discussions that took place, both on tech and the opportunities. Note that Dat is the old name for Hypercore. The transition is in full swing, but you will still see it a lot.

3. [Workshop at the 2020 Conference](https://github.com/RangerMauve/dat-workshop) with sources and video.

4. [Kappa workshop](https://github.com/kappa-db/workshop) is a great basic intro, we [forked it](https://github.com/tradle/hypercore-workshop) to update to new materials and shift focus to core Hypercore modules.

5. Read [old FAQ](https://docs.dat.foundation/docs/faq) (before project was renamed from Dat to Hypercore).
