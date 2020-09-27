# Hypercore universe FAQ <!-- omit in toc --> 
Here is an older [Dat FAQ](https://docs.dat.foundation/docs/faq), I will incorporate its answers that are relevant into this FAQ over time.

Many of the answers below are taken from Hypercore protocol discussion forum. All interpretations are ours, and so are the possible mistakes and misunderstandings. Please send corrections as pull requests, or request commit rights. Questions that need answers are marked with **Need help with this**.

- [General](#general)
  - [What are the main components / modules / packages?](#what-are-the-main-components--modules--packages)
  - [What is the USP (Unique Selling Proposition) of Hypercore?](#what-is-the-usp-unique-selling-proposition-of-hypercore)
  - [What is offline-first principle?](#what-is-offline-first-principle)
  - [What is a streaming DB?](#what-is-a-streaming-db)
  - [How is Hypercore different from BitTorrent, WebTorrent?](#how-is-hypercore-different-from-bittorrent-webtorrent)
  - [How is Hypercore different from ScuttleButt?](#how-is-hypercore-different-from-scuttlebutt)
  - [How is Hypercore different from IPFS?](#how-is-hypercore-different-from-ipfs)
  - [Why Hypercore is not yet mainstream?](#why-hypercore-is-not-yet-mainstream)
  - [Who is using Hypercore P2P framework today?](#who-is-using-hypercore-p2p-framework-today)
  - [Is there support for social key recovery?](#is-there-support-for-social-key-recovery)
  - [Is there a regular key rotation and key replacement mechanism?](#is-there-a-regular-key-rotation-and-key-replacement-mechanism)
  - [Is there an authentication system?](#is-there-an-authentication-system)
  - [Is there a discovery system to learn what feeds the other peer shares?](#is-there-a-discovery-system-to-learn-what-feeds-the-other-peer-shares)
  - [Help me picture use cases for Hyperswarm?](#help-me-picture-use-cases-for-hyperswarm)
- [If Hypercore is a P2P Web, what is its URL format?](#if-hypercore-is-a-p2p-web-what-is-its-url-format)
- [Does hypercore support writing by multiple people?](#does-hypercore-support-writing-by-multiple-people)
  - [Filesystem workaround](#filesystem-workaround)
  - [Union of Hyperbees?](#union-of-hyperbees)
  - [Practical conflict resolution for common use cases](#practical-conflict-resolution-for-common-use-cases)
  - [Simulated multi-writer on top of multiple single-writers](#simulated-multi-writer-on-top-of-multiple-single-writers)
  - [Is it multi-process-safe?](#is-it-multi-process-safe)
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
    - [Only one Hyperbee per Hypercore?](#only-one-hyperbee-per-hypercore)
    - [What are the limitations on consistency?](#what-are-the-limitations-on-consistency)
    - [Can it serve as LevelDB replacement?](#can-it-serve-as-leveldb-replacement)
  - [Hyperswarm](#hyperswarm)
    - [Can we distinguish between peers before connecting to them?](#can-we-distinguish-between-peers-before-connecting-to-them)
    - [Is Hyperswarm anonymous?](#is-hyperswarm-anonymous)
  - [Hyperdrive](#hyperdrive)
    - [How can Hyperdrive be shared?](#how-can-hyperdrive-be-shared)
- [Where can I learn more about Hypercore universe?](#where-can-i-learn-more-about-hypercore-universe)

## General

This section is for general questions. See other sections for questions specific to individual Hypercore modules.

### What are the main components / modules / packages?

- **Hypercore**, the underlying append-log-only data structure for all of Hyper universe.
- **Hypertrie**, a key-value store, which is used by Hyperdrive as its directory structure.
- **Hyperbee**, a key-value and sorted range queries (as a database backend)
- **Corestore**, to managing many Hypercores you typically end up authoring or replicating from others.
- **Hyperdrive**, a P2P alternative to Google Drive and Dropbox 
- **Beaker Browser**, a full-blown browser that also supports the Web without servers (P2P Web).

### What is the USP (Unique Selling Proposition) of Hypercore?

Hypercore is Open Source, it is not selling, but it is offering itself to developers. So what is it that is absolutely unique about it? It is P2P, but we saw other P2P technologies, BitTorrent and Bitcoin.

Hypercore's USP is **streaming**. You can think of it as video streaming, but now for any data, videos and databases and more. With streaming, you get almost immediate access, even though the data is not yet fully downloaded or never will be fully downloaded.

This point needs to be repeated again and again, as streaming data (files, videos, databases, messages, IoT, and any other structured data constructs), just by itself, without any other wonderful Hypercore capabilities, may create a new class of applications, much like Netflix re-invented the movie watching. This paradigm shift is one reason why Hypercore is hard to grok for app developers, it just requires full rethinking of our current architectures.

Note, when reading Hypercore docs you will find many references to Sparse files and sparse DB. This is the capability used for streaming, that is a peer can efficiently request individual blocks from remote peers, instead of loading the whole thing, be it a video file or a database.

### What is offline-first principle?

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
3. It provides data add/edit version history which allows auditing, point-in-time-recovery, and state snapshots.
4. It provides sparse download like BitTorrent, but extends it to databases.
5. Hypercore has data access authentication.
6. Hypercore has network encryption.

**WebTorrent**. WebTorrent is awesome, it pioneered BitTorrent in browsers and its is a great success, but its mission statement was just that, a BitTorrent for the Web.

Note that WebTorrent's tech can be helpful to Hypercore, as it perfected peer discovery (via DHT) on the Web and it allowed a number of innovative streaming clients to emerge, which could be helpful for Hypercore applications, like Beaker Browser.

### How is Hypercore different from ScuttleButt?

- ScuttleButt is not suited for streaming, as it does not have a sparse data structure (enabled in Hypercore by Merkle trees, while ScuttleButt uses linked lists).

- Need help with this.

### How is Hypercore different from IPFS?

All three are cool open source P2P data projects that have existed for roughly the same 5-7 years.

Some key differences, [described here](https://www.datprotocol.com/deps/0002-hypercore/), are:

- IPFS was designed as content-addressed immutable storage. Naming system [IPNS](https://docs.ipfs.io/concepts/ipns/#example-ipns-setup) was added then, to point to the latest version of the data. In Hypercore editable content was a prime design objective, supported by the internal data structures, its protocol, Change Data Capture system, APIs, etc. 
- Neither [IPNS](https://docs.ipfs.io/concepts/ipns/#example-ipns-setup) nor Hypercore's Beaker URL have human-friendly addresses.
- IPFS was designed for files, so it is not suitable for databases. It also has limited support for data editing and data integrity (history of changes).
- IPFS team has produced Filecoin spec and raised $205M on ICO to build it, so it is funded to sustain long-term development. Hypercore team on the other hand is quite lightly funded by grants and consulting projects. That said, many ICOs ran into legal trouble with SEC in the US, the most high profile of them was Telegram recently. Other tensions [for IPFS team are rising](https://fortune.com/2020/08/19/are-blockchain-companies-cursed-with-too-much-cash/), as it still did not deliver a Filecoin product.

Some notes on IPFS goodies:

- [IPNS has has captured imagination of Ethereum community](https://blog.infura.io/an-introduction-to-ipfs/) to build fully decentralized apps, as most blockchain apps today still keep data and processing centralized.
- IPFS project has produced solid core libraries, like libp2p, solving many of the same issues as Hypercore's Hyperswarm.
- IPFS has implementations in a number of languages, while Hypercore is only in JavaScript. Rust implementation was recently started and hopefully will lead to overall health of Hypercore, forcing better documented specs and more test-suits.
- IPFS team runs a number of public servers that help make the network more usable.

### Why Hypercore is not yet mainstream?

It is a fact that Hypercore is 7 years old and still has no runaway apps built on it. So what gives, if it is so amazing, and it is! Here is my take, aside from a general statement that making a P2P framework work smoothly is super-hard:

Many P2P apps struggle as they lack availability, durability and work in the unforgiving networking environments.

- **Availability**. For example, in a P2P collaborative editing app competing with Google Docs, once you close your laptop, your collaborators can't get your latest content, unless they were online when you made edits. With Google Docs, if you had a connection at the time of the last edit, the changes are available to others, even if you went offline right after. This is especially important for team work across the timezones. So some master nodes that "seed" the content are always needed in P2P applications (e.g. Hashbase), but these so called super-nodes often re-centralize things and introduce challenges for permissioning, data sovereignty, and data privacy. Availability problem remains unsolved.

- **Durability**. We are spoiled with Google (and others) taking care of preserving our content. We pay a steep price of giving them everything on us, but this convenience is very hard to achieve in P2P world. Your peers may be good friends but there is no guarantee they will not lose your precious content. Many solutions are being tried, including those with Cryptocurrencies incentivizing users to keep content, but they all have technical and convenience frictions. Besides, who wants to be responsible for disseminating a potentially illegal content? Durability problem remains unsolved.

- **Networking**. Current Internet, with its routing and firewalling system is just hostile to P2P connections. Although Hypercore's Hyperswarm offers an ingenious NAT hole punching, there are too many edge cases, when it does not work on mobiles, it needs workarounds in browsers and is often blocked by corporate firewalls. This does not mean it can't be used, we just need a fallback to a trusted server acting as a proxy. But this comes at the same price of decentralization. Reliable Networking remains unsolved.

Is there an answer to those perpetual problems of P2P? We believe there is. In crypto world the answer was found with the notion of miners. This is why some P2P projects are attempting to repeat this approach introducing their own blockchains. IPFS team's Filecoin, Storj, Theta.tv and a number of others are examples. But they are all focused on data storage.

Hypercore is so much more. It is a foundation ford apps, that is storage, content distribution, compute, messaging, networking, analytics, AI, etc.

We believe the answer is not in copying the mining model and offering crypt-incentives. The answer we believe is a Personal Cloud, your always-available durable peer, a companion to your less-capable personal devices, a place to run many Hypercore apps that can't run on personal devices. We believe Personal Cloud will make Hypercore shine.

### Who is using Hypercore P2P framework today?

Need help with this.

Partial answer is:

Each project building on Hypercore is stretching its flexibility and contributes back solutions that are not yet available in the core. Then Hypercore team generalizes them and makes available for everyone. See some of the projects and their notable contributions:

- Bitfinex, major crypto exchange uses it in its microservices framework [Grenache](https://github.com/bitfinexcom/grenache). Bitfinex helped extend Hyperswarm DHT to improve peer discovery. Bitfinex also pushed the envelope with Hypercore team on creating the first payments framework for Hypercore.
- [Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/2_work-plan/mvp/mvp-design.md), focused on enabling teams. Cobox community created a KappaDB, a multi-writer database, peer discovery with multifeed, and pushed the envelop on collaborative editing.
- [Peermaps](https://peermaps.org/), building P2P alternative to Google Maps based on OpenStreetMap
- [Sonar](https://arso-project.github.io/sonar-book), distributed media archives on Hypercore. Note an interesting [bulk update](https://discordapp.com/channels/709519409932140575/727886901100675083/755723909709561856) feature discussion re:Sonar, which sounds like addressing a pain similar to serverless apps.
- See at the bottom of [Hypercore protocol page](https://hypercore-protocol.org/)
- See discussion forum where people [showcase their Hyper projects](https://discordapp.com/channels/709519409932140575/712037351244955809/712037741126221924).

### Is there support for social key recovery?

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

Yes. Managed by Corestore, or community provided multifeed.
Need help with this.

### Help me picture use cases for Hyperswarm?

Ideas that fit Hyperswarm's mission to help discover peers and connect to them without using any servers:

- establish a [Video chat session over WebRTC](https://twitter.com/pfrazee/status/1248744869419458561), which otherwise needs a [STUN server](https://www.callstats.io/blog/2017/10/26/webrtc-product-turn-server). Peersockets module adds convenience and efficiency for [talking to peers on a swarm topic](https://github.com/andrewosh/peersockets).

- connect to peers sitting behind home routers, which otherwise can't connect to each other. (Hyperswarm's here is so called NAT hole punching). Keep in mind this does not work on mobiles (and behind some corporate firewalls), and requires a proxy (e.g. This post says [30% of P2P connections need TURN proxy](https://www.callstats.io/blog/2017/10/26/webrtc-product-turn-server)). Our idea is to use not a public server, but a Personal Cloud as such a proxy, to avoid loss of privacy.

- DNS replacement. E.g. a client app needs to find a server and wants to avoid a centralized DNS, or just avoid a reliance on yet another service, if DHT is already used anyway. Same when Router / balancer needs to find a particular server. See one possible design for [DHT as a decentralized DNS in 2 round-trips](https://github.com/hallettj/my-dns/blob/942370cb2052f0d020564b64710e30ddc92ee5ef/uunet.markdown).

- Server-less Contact Tracing on DHT. See this idea described in detail [in this paper](https://eprint.iacr.org/2020/398.pdf).

- Hyperswarm is also a Publish Subscribe in a way. Need help on this.

## If Hypercore is a P2P Web, what is its URL format?

URL is designed to be used in Beaker. Its schema is dat:// or hyper://
It must be followed by the <publicKey> of a Hypercore feed.

Note that in the future it is planned to support [Strong linking](https://github.com/mafintosh/hypercore-strong-link) to a particular version of the data element.

When supported, I think such URL needs to have both stable part and version part. It also needs to allow URLs to be used by internal components and apps, not just in Beaker. A typical use case for this is link from a data element in Hyperbee to a file Hyperdrive.

## Does hypercore support writing by multiple people?

No. But keep reading.

Multi-writer is probably the [most requested feature](https://github.com/hypercore-protocol/hyperdrive/issues/230) of Hypercore, as it is a common pattern of working with files and databases today.

Single-writer advantage is a verifiable integrity. For example, in Tradle digital identity product the single-writer is a core pattern, that is no record can be edited other then by it's author, and data models are designed to accommodate this approach. It produces much safer Data Governance and cleaner audit trail. That still requires a search across all single-writer stores, sort of like a union of all Hyperbees.

It is possible to create a composite multi-writer on top.

### Filesystem workaround

Hypertrie now provides Mounts which allow to present other people's drives as your read-only subfolders. This is a good workaround, but not a shared filesystem like NFS.

[Multi-hyperdrive](https://github.com/RangerMauve/multi-hyperdrive/) is a new package that achieves impressive results for multi-writer Hyperdrive. See also co-hyperdrive from the same author that adds authorizations.

### Union of Hyperbees?

Maybe [streaming sort-merge mechanism](http://github.com/mafintosh/sorted-union-stream) can help? I wonder if it is performant across millions of Hyperbees? Like on an e-commerce site, a merchant would search for orders from a million people? May be with incremental merges?

Cabal / Cobox / Kappa have gained some experience with [re-indexing of multiple remote feeds in a local feed](https://discordapp.com/channels/709519409932140575/709519410557222964/756414542669676573) and their approach works for groups but does not scale for e-commerce use cases.

### Practical conflict resolution for common use cases

There are cases when CRDT algorithm is more suitable than database concurrency. CRDT is implemented by [Automerge](https://github.com/automerge/automerge), and used by [Hypermerge](https://github.com/automerge/hypermerge). It is also independently implemented by [YJS](https://github.com/yjs/yjs). Such cases are:

- **Collaborative editing**. A P2P Google Doc alternative allowing document to be edited by multiple people simultaneously. 
  
- **Multi-device support**. Each device is a single writer with unique key per hypercore. Normally a single person will not be using 2 devices simultaneously. Yet because of the loss of connectivity changes on two devices may need to be merged, and CRDT is ok for that. Besides, with the help of always-on Personal Cloud and real-time replication in Hypercore the conflicts would arise rarely.
  
- **Multiple Replicas of a Personal Cloud** are needed for durability, availability and load-balancing. Again, like with multi-device, each replica is a single-writer with its own private key. But this case has higher concurrency potentially, as in serverless environment 2 concurrent writes may occur. Yet, if those writes come from the devices of the same person, conflict CRDT resolution should be sufficient.

### Simulated multi-writer on top of multiple single-writers

[Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/3_mock-up/technology/architecture.md) produced a multi-writer DB [KappaDB](https://github.com/kappa-db).

[HyperDB](https://github.com/mafintosh/hyperdb) is an older Hypercore project which is a multi-writer database, but it is not seeing any support anymore, presumably as it could not be made performant, but it may still help some apps before a replacement comes in (need confirmation).

[Co-Hyperdrive](https://github.com/RangerMauve/co-hyperdrive). A multi-writer hyperdrive implementation. 

As you see it is not a problem that has a generic solution in Hypercore. But maybe instead of focusing on Hyperdrive or a DB we should focus on the use case, specifically a [single-user multi-device use case](https://github.com/tradle/why-hypercore/issues/7).

### Is it multi-process-safe?

We know it is single-writer. But can same writer accidentally screw up the Hypercore while being executed from a second processes on the same machine? If so, it will present a significant design challenge in Serverless environment.

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

#### Only one Hyperbee per Hypercore?

Yes. But one replication stream [can carry many Hypercores](https://discordapp.com/channels/709519409932140575/709519410557222964/755415844808556594). Use Corestore to manage multiple hypercore feeds, with permissions.

#### What are the limitations on consistency?

Need help with this.
While it is eventual consistency today, can higher guarantees be provided?

#### Can it serve as LevelDB replacement?

Yep. Needs to be wrapped into [Hyperbeedown](https://github.com/andrewosh/hyperbeedown) and fed into [LevelUP](https://github.com/Level/levelup).

This is awesome as there are many databases that work on top of the API used by LevelDB.

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

Hyperdrive provides many of the hard to create components to replicate the functionality of Dropbox and Google Drive. Beaker Browser adds the UI it.

Hyperdrive is a library and also provides a [daemon](https://github.com/hypercore-protocol/hyperdrive-daemon) to run as a service, accessible via an API and can show up as a [normal directory on your disk](https://github.com/hypercore-protocol/hyperdrive-daemon#fuse) (This part works on MacOS and Linux, with Windows in works).

#### How can Hyperdrive be shared?

1. Underlying mechanism is built into Hypercore, and works for all data structures that use it: Hyperdrive, Hypertrie and Hyperbee. You can share the read-only version of your whole hypercore with others, by giving them the public key of the Hypercore.

2. Hyperdrive itself is actually 2 hypercores for directory structure and metadata, and for file content. So to share it you use the above URL (need confirmation for that).

3. Hyperdrive also support mounts. It allows to include other people's drives under your your own Hyperdrive as a folder. Mounts are still read-only though, But this allows people to continue editing files on their Hyperdrives and all people that mounted it will see updates in real-time.

4. Hypertrie also supports mounts, which allows a Key-Value store supported by the whole team. [Mountable Hypertrie](https://github.com/andrewosh/mountable-hypertrie) is actually what Hyperdrive uses underneath for mounts.

## Where can I learn more about Hypercore universe?

1. In the summer of 2020 there was a [Dat Conference](https://www.youtube.com/playlist?list=PL7sG5SCUNyeYx8wnfMOUpsh7rM_g0w_cu). You can see the breadth of discussions that took place, both on tech and the opportunities. Note that Dat is the old name for Hypercore. The transition is in full swing, but you will still see it a lot.

2. [Kappa workshop](https://github.com/kappa-db/workshop) is a great basic intro, we [forked it](https://github.com/tradle/hypercore-workshop) to update to new materials and shift focus to core Hypercore modules.
