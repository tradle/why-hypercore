# Hypercore universe FAQ
<!-- TOC -->autoauto- [Hypercore universe FAQ](#hypercore-universe-faq)auto    - [General](#general)auto    - [What are the main components / modules / packages?](#what-are-the-main-components--modules--packages)auto        - [What is the USP (Unique Selling Proposition) of Hypercore?](#what-is-the-usp-unique-selling-proposition-of-hypercore)auto        - [What is a streamed DB?](#what-is-a-streamed-db)auto        - [How is Hypercore different from BitTorrent, WebTorrent?](#how-is-hypercore-different-from-bittorrent-webtorrent)auto        - [How is Hypercore different from ScuttleButt and IPFS?](#how-is-hypercore-different-from-scuttlebutt-and-ipfs)auto        - [Why Hypercore is not yet mainstream?](#why-hypercore-is-not-yet-mainstream)auto        - [Hyper: who is using Hypercore modules?](#hyper-who-is-using-hypercore-modules)auto        - [Can data be deleted?](#can-data-be-deleted)auto        - [Hyperbee: Is it only one Hyperbee per Hypercore?](#hyperbee-is-it-only-one-hyperbee-per-hypercore)auto        - [Hyperbee: What are the limitations on consistency?](#hyperbee-what-are-the-limitations-on-consistency)auto        - [Hyperswarm: Can we distinguish between peers before connecting to them?](#hyperswarm-can-we-distinguish-between-peers-before-connecting-to-them)auto        - [Does Hypercore work in the browser, on mobiles?](#does-hypercore-work-in-the-browser-on-mobiles)auto        - [Is there support for social key recovery?](#is-there-support-for-social-key-recovery)auto        - [Does Hyperswarm work in browsers, on mobile?](#does-hyperswarm-work-in-browsers-on-mobile)auto        - [Is there an authentication and authorization system?](#is-there-an-authentication-and-authorization-system)auto        - [If Hypercore is P2P Web, what is its URL format?](#if-hypercore-is-p2p-web-what-is-its-url-format)auto        - [Hyperdrive: How the hyperdrive can be shared?](#hyperdrive-how-the-hyperdrive-can-be-shared)auto        - [Does hypercore support writing by multiple people?](#does-hypercore-support-writing-by-multiple-people)auto        - [Is it multi-process-safe?](#is-it-multi-process-safe)auto        - [What is the biggest gotcha with Hypercore?](#what-is-the-biggest-gotcha-with-hypercore)auto        - [How to discover all feeds that the peer can give us?](#how-to-discover-all-feeds-that-the-peer-can-give-us)auto        - [Can Hypercore storage be encrypted at-rest?](#can-hypercore-storage-be-encrypted-at-rest)auto        - [Does Hypercore support zero-knowledge store / blind replication?](#does-hypercore-support-zero-knowledge-store--blind-replication)auto        - [Does Hypercore support erasure-coding?](#does-hypercore-support-erasure-coding)auto        - [Is Hyperswarm anonymous?](#is-hyperswarm-anonymous)auto        - [Hyperbee: can it serve as LevelDB replacement?](#hyperbee-can-it-serve-as-leveldb-replacement)auto        - [Is hypercore network traffic end-to-end encrypted?](#is-hypercore-network-traffic-end-to-end-encrypted)auto        - [Is hyperswarm network traffic end-to-end encrypted?](#is-hyperswarm-network-traffic-end-to-end-encrypted)autoauto<!-- /TOC -->

Many of the answers below are taken from Hypercore protocol discussion forum. All interpretations are ours, and so are the possible mistakes and misunderstandings. Please send corrections as pull requests, or request commit rights. Questions that need answers are marked with **Need help with this**.

## General

This section is for general questions. See other sections for questions specific to individual Hypercore modules.

## What are the main components / modules / packages?

- Hypercore, the underlying append-log-only data structure for all of Hyper universe.
- Hypertrie, the key-value store, which is used by Hyperdrive as its directory structure.
- Hyperbee key-value and sorted range queries (as a database backend)
- Corestore - managing many Hypercores you typically end up authoring or replicating from others.
- Hyperdrive, a Google Drive and Dropbox alternative 
- Beaker Browser, a full-blown browser that also supports the Web without servers (P2P Web).

### What is the USP (Unique Selling Proposition) of Hypercore?

Hypercore is Open Source, it is not selling, but it is offering itself to developers. So what is it that is absolutely unique about it? It is P2P, but we saw other P2P technologies, BitTorrent and Bitcoin.

Hypercore's USP is **streaming**. You can think of it as video streaming, but now for any data, videos and databases and more. With streaming, you get almost immediate access, even though the data is not yet fully downloaded or never will be fully downloaded.

This point needs to be repeated again and again, as streaming data (files, videos, databases, messages, IoT, and any other structured data constructs), just by itself, without any other wonderful Hypercore capabilities, may create a new class of applications, much like Netflix re-invented the movie watching. This paradigm shift is one reason why Hypercore is hard to grok for app developers, it just requires full rethinking of our current architectures.

Note, when reading Hypercore docs you will find many references to Sparse files and sparse DB. This is the capability used for streaming, that is a peer can efficiently request individual blocks from remote peers, instead of loading the whole thing, be it a video file or a database.

### What is a streamed DB?

Need help with this.
How is it different from a DB that we normally access via API on the network today? What applications can we think of that were not feasible before? Some pointers to possible answers can be found when we compare a P2P source control system Git, with the SVN and CVS before it which relied on a central server. Those entrepreneurs that think "Is it possible to make a big business on this?", please note that Microsoft bought Github for $7.5B.

### How is Hypercore different from BitTorrent, WebTorrent?

**BitTorrent**. Hypercore can do what BitTorrent does and more. Hypercore can do discovery and accelerated file download with bandwidth-sharing like BitTorrent. But Hypercore can do more - it is built as a data and communications framework for modern applications. Applications need data structures, like Hypercore log, Hypertrie key-value store and Hyperbee database, and importantly data needs to be editable. BitTorrent has none of that and it is inherently immutable (yes, proposals exist for extending BitTorrent to modifiable data, but did they gain ground and are they the afterthought for the protocol?).

**WebTorrent**. WebTorrent is awesome, it pioneered BitTorrent in browsers and its is a great success, but its mission statement was just that, a BitTorrent for the Web.

Note that WebTorrent's tech can be helpful to Hypercore, as it perfected peer discovery (via DHT) on the Web and it allowed a number of innovative streaming clients to emerge, which could be helpful for Hypercore applications, like Beaker Browser.

### How is Hypercore different from ScuttleButt and IPFS?

Need help with this.
All three are cool open source P2P data projects that have existed for roughly the same 5-7 years.

Some key differences, [described here](https://www.datprotocol.com/deps/0002-hypercore/), are:

- ScuttleButt is not suited for streaming, as it does not have a sparse data structure (enabled by Merkle trees, while ScuttleButt uses linked lists).
- IPFS was designed for files, so it is not suitable for databases. It also has limited support for data editing and data integrity (history of changes).
- IPFS team has produced Filecoin spec and raised $205M on ICO to build it so it is funded to sustain long-term development. Hypercore team on the other hand is quite lightly funded by grants and consulting projects. That said, many ICOs ran into legal trouble with SEC, the most high profile of them was Telegram recently. Other tensions [for IPFS team are rising](https://fortune.com/2020/08/19/are-blockchain-companies-cursed-with-too-much-cash/), as it still did not deliver a Filecoin product.

Some notes on IPFS goodies:

- IPFS has a human friendly IPNS naming system, which Hypercore currently lacks.
- IPFS project has produced solid core libraries, like libp2p, solving many of the same issues as Hypercore's Hyperswarm.
- IPFS has implementations in a number of languages, while Hypercore is only in JavaScript. Rust implementation was recently started and hopefully will lead to overall health of Hypercore, forcing better documented specs and more test-suits.

### Why Hypercore is not yet mainstream?

It is a fact that Hypercore is 7 years old and still has no runaway apps built on it. So what gives, if it is so amazing, and it is! Here is my take, aside from making a  P2P framework being super-hard:

Many P2P apps struggle as they lack availability, durability and work in the unforgiving networking environments.

- **Availability**. For example, in a P2P collaborative editing app competing with Google Docs, once you close your laptop, your collaborators can't get your latest content, unless they were online when you made edits. With Google Docs, if you had a connection at the time of the last edit, the changes are available to others, even if you went offline right after. This is especially important for team work across the timezones. So some master nodes that "seed" the content are always needed in P2P applications (e.g. Hashbase), but these so called super-nodes often re-centralize things and introduce challenges for permissioning, data sovereignty, and data privacy. Availability problem remains unsolved.

- **Durability**. We are spoiled with Google (and others) taking care of preserving our content. We pay a steep price of giving them everything on us, but this convenience is very hard to achieve in P2P world. Your peers may be good friends but there is no guarantee they will not lose your precious content. Many solutions are being tried, including those with Cryptocurrencies incentivizing users to keep content, but they all have technical and convenience frictions. Besides, who wants to be responsible for disseminating a potentially illegal content? Durability problem remains unsolved.

- **Networking**. Current Internet, with its routing and firewalling system is just hostile to P2P connections. Although Hypercore's Hyperswarm offers an ingenious NAT hole punching, there are too many edge cases, when it does not work on mobiles, it needs workarounds in browsers and is often blocked by corporate firewalls. This does not mean it can't be used, we just need a fallback to a trusted server acting as a proxy. But this comes at the same price of decentralization. Reliable Networking remains unsolved.

Is there an answer to those perpetual problems of P2P? We believe there is. In crypto world the answer was found with the notion of miners. This is why some P2P projects are attempting to repeat this approach introducing their own blockchains. IPFS team's Filecoin, Storj, Theta.tv and a number of others are examples. But they are all focused on data storage.

Hypercore is so much more. It is a foundation ford apps, that is storage, content distribution, compute, messaging, networking, analytics, AI, etc.

We believe the answer is not in copying the mining model and offering crypt-incentives. The answer we believe is a Personal Cloud, your always-available durable peer, a companion to your less-capable personal devices, a place to run many Hypercore apps that can't run on personal devices. We believe Personal Cloud will make Hypercore shine.

### Hyper: who is using Hypercore modules?

Need help with this.

Partial answer is:
- Bitfinex, major crypto exchange uses it in its microservices framework [Grenache](https://github.com/bitfinexcom/grenache). 
- See at the bottom of [Hypercore protocol page](https://hypercore-protocol.org/)
- See discussion forum where people [showcase their Hyper projects](https://discordapp.com/channels/709519409932140575/712037351244955809/712037741126221924).

### Can data be deleted?

[Somewhat](https://discordapp.com/channels/709519409932140575/709519410557222964/755404488415772746) - you can [clear() your content locally](https://github.com/hypercore-protocol/hypercore#feedclearstart-end-callback), but if someone replicated it already, you can’t force them to clear. Also, internal data integrity records are still kept, but they do not leak any data (Merkle tree hashes are kept, so you can keep appending data to your log even if you clear the contents). Use cases:

- Chat. You can delete a chat message locally. To delete the chat message at recipient(s) need to send a custom some message “please delete this”.
- Mobile. You can delete photos from mobile to save space, but keep them on a replica (your other PC or a Personal Cloud).

### Hyperbee: Is it only one Hyperbee per Hypercore?

Yes. But one replication stream [can carry many Hypercores](https://discordapp.com/channels/709519409932140575/709519410557222964/755415844808556594). Use Corestore to manage multiple hypercore feeds, with permissions.

### Hyperbee: What are the limitations on consistency?

Need help with this.
While it is eventual consistency today, can higher guarantees be provided?

### Hyperswarm: Can we distinguish between peers before connecting to them?

Need help with this.

No.
Once you write your first Hyperswarm and print all the new peers joining it, you will likely notice all kinds of peers that have nothing to do with you. Who are they? For a website and public media like Twitter or YouTube-style application, it is totally fine. But in a security-focused application you might get concerned.

Any hypercore-savvy person will argue that this is ok, as you will not be sharing any data. To access the Hypercore feeds you still need to know their publicKey. But the fact is, you still need to connect to all peers to figure out if you even want them. This is not efficient and can present some surveillance challenges.

This can be very useful:

- To know if peers are readers or writers, or filter them out with some cryptography-based primitives, and avoid connecting to those that you do not trust.

- Load balancing between peers. It would ridiculous for the Router design to expect the Router to connect to peers to determine who to forward request to.

- Can Sybil attacks and DDOS on DHT, mentioned in [Hyperswarm blog](https://pfrazee.hashbase.io/blog/hyperswarm), be prevented if DHT itself could be selective about the peers?

### Does Hypercore work in the browser, on mobiles?

Yes. Hypercore is transport-independent. One can use TCP/IP, WebRTC to peers, WebSockets to server.

### Is there support for social key recovery?

No. But a community solution and other open source projects exist that can possibly be adapted.
This is essential need for any P2P applications, and the same need for Bitcoin, as the user may only rely only on themselves for key management.

- Community solution: [secret into N parts and allows restore with M of N replicas](https://github.com/jwerle/hyper-secret-sharing)

- Full blown framework for this exists, called [Dark Crystal](https://darkcrystal.pw/)

- A number of implementations of [Shamir secret sharing in JS](https://github.com/topics/shamir-secret-sharing?l=javascript&o=desc&s=stars) exist
  
For reference, see how open source app [Consento](https://consento.org/) does it.

### Does Hyperswarm work in browsers, on mobile?

Not directly, but community solutions exist.
See the [issue for this](https://github.com/hyperswarm/hyperswarm/issues/62). The difficulty is due to the use of UDP, which is not available in the browser. On mobile NAT hole punching may not succeed. On PCs some corporate firewalls may also block UDP. Need to bridge to DHT over WebSockets or WebRTC.

[This solution uses 2 servers for signaling](https://github.com/RangerMauve/hyperswarm-web).

Note that [WebTorrent uses webrtc](https://webtorrent.io/docs) for DHT, but their approach is not adopted by Hypercore. 

See a number of issues still pending resolution to make Hyperswarm and Hypercore [work in react-native](https://dat.discourse.group/t/dat-and-react-native/184)

### Is there an authentication and authorization system?

Sort of. Some capabilities exist to build upon.

1. Each Hypercore has a public / private key pair. Corestore provides deterministic key generation from a Master key. There is also a keypair generated by [Noise protocol](https://github.com/mafintosh/noise-network), which was added in [Hypercore V8]((https://mafinto.sh/blog/introducing-hypercore-8.html)) im 2018. [Noise protocol](https://noiseprotocol.org/) was designed as part of Signal Messenger and is now used by WhatsApp, WireGuard, Lightning, and I2P.

2. There is a hook that can be registered for feed authentication.

### If Hypercore is P2P Web, what is its URL format?

URL is designed to be used in Beaker. Its schema is dat:// or hyper://
It must be followed by the <publicKey> of a Hypercore feed.

Note that in the future it is planned to support [Strong linking](https://github.com/mafintosh/hypercore-strong-link) to a particular version of the data is planned.

When supported, I think such URL needs to have both stable part and version part. It also needs to allow URLs to be used by internal components and apps, not just in Beaker. A typical use case for this is link from a data element in Hyperbee to a file Hyperdrive.

### Hyperdrive: How the hyperdrive can be shared?

1. Underlying mechanism is built into Hypercore, and works for Hyperdrive, Hypertrie and Hyperbee. You can share the read-only version of your whole hypercore with others, by giving them the public key of the Hypercore.

2. Hyperdrive itself is actually 2 hypercores for directory structure and metadata, and for file content. So to share it you use the above URL (need confirmation for that).

3. Hyperdrive also support mounts. It allows to include other people's drives under your your own Hyperdrive as a folder. Mounts are still read-only though, But this allows people to continue editing files on their Hyperdrives and all people that mounted it will see updates in real-time.

4. Hypertrie also supports mounts, which allows a Key-Value store supported by the whole team. [Mountable Hypertrie](https://github.com/andrewosh/mountable-hypertrie) is actually what Hyperdrive uses underneath for mounts.

### Does hypercore support writing by multiple people?

No. But keep reading.

Older [HyperDB](https://github.com/mafintosh/hyperdb) project is a multi-writer database, but it is not seeing any support anymore, presumably as it could not be made performant, but amy still help some apps (need confirmation)

Multiple Hyperbees from different writers can be merged with a [streaming sort-merge mechanism](http://github.com/mafintosh/sorted-union-stream). But can this be done for an e-commerce site, where merchant receives orders from a million people? May be incrementally (need confirmation)

It is important to understand that Hypercore is by design a single-writer system. So one can't have a shared database, as is, or a shared folder. Multi-writer is probably the most requested feature of Hypercore, but we should not wait for it, as it is far away on the Hypercore team's roadmap.

Instead we should use the above workarounds in a clever way, to leverage single-writer advantages of verifiable integrity, and alleviate in our designs the pains it gives users.

Aside from Shared database or a folder discussed above, multi-writer actually has 2 other use cases that can be tackled with an algorithm called CRDT, implemented by [Automerge](https://github.com/automerge/automerge), used by [Hypermerge](https://github.com/automerge/hypermerge) and independently by [YJS](https://github.com/yjs/yjs):

- **Collaborative editing**. This is a case of Google Doc edited by multiple people in parallel. Each person is a single-writer and CRDT should handle conflicts. In fact both Hypermerge and YJS have direct support for this in Hypercore (although YJS is not yet fully baked as of this writing)
  
- **Multi-device support**. This is ultimately a single-write use case, as each device will anyway have its own private key, and its own hypercore. It does not present a hard concurrency problem as a single person will be using both devices. Yet because of the loss of connectivity changes on two devices may be made parallel.
  
- **Multiple Replicas in Personal Cloud**, used for durability, availability and load-balancing. Again, like with multi-device, each replica is a single-writer with its own private key. But this case has higher concurrency potentially, as in serverless environment 2 concurrent writes may occur. Yet, if those writes come from the devices of the same person, conflict CRDT resolution should be sufficient.

### Is it multi-process-safe?

We know it is single-writer. But can same writer accidentally screw up the Hypercore while being executed from a second processes on the same machine? If so, it will present a significant design challenge in Serverless environment.

### What is the biggest gotcha with Hypercore?

Need help with this. @Mauve?
Probably copying the Hypercore's directory to another machine and copying a private key and trying to write into this Hypercore while making updates in the original Hypercore.

### How to discover all feeds that the peer can give us?

Hypercore is not like Kafka, which writes everything into one log (at least logically one, with topics). You end up with many Hypercores and you need a way to manage them and discover what hypercores other people have shared with you. The bootstrapping mechanism for this is to find peers, a Hyperswarm. But it is not enough, thus several discovery systems were designed, and the main one is corestore. Simpler one, is multifeed created by community.

### Can Hypercore storage be encrypted at-rest?

Yes, offered by community solutions. Ypu will need explore their limitations. See some below:

- [Cobox Hypercore Encryption](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/2_work-plan/mvp/mvp-design.md).

- [hypercore-encrypted](https://www.npmjs.com/package/hypercore-encrypted), a wrapper around hypercore. 

### Does Hypercore support zero-knowledge store / blind replication?

Yes, offered by community solutions. 
the above terms refer to an encrypted replica kept by a friend or a services provider, like [SpiderOak](https://spideroak.com/one/), but can't be read by them.

Current solutions are provided by the community:

- [ciphercore](https://github.com/telamon/ciphercore)
  
- [Cobox community](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/3_mock-up/technology/architecture.md)

### Does Hypercore support erasure-coding?

No.
Erasure coding is used to recover data from a subset of overall amount of replicas.
S3-compatible object storage provided by [Min.io](https://docs.min.io/docs/minio-erasure-code-quickstart-guide.html) has it.
For the Data Center, perhaps we need to look at the underlying virtualized file system to provide it, like Ceph (but it is known to be very heavy and hard to manage)

### Is Hyperswarm anonymous?

Now, Hyperswarm announces IP and Port.

- Potentially [I2P](https://dat.discourse.group/t/feature-support-i2p/62/6) can be used in the future.

- Or perhaps DHT data in the future can be encrypted, to be decrypted only ny those who have permission?

### Hyperbee: can it serve as LevelDB replacement?

Yep. Needs to be wrapped into [Hyperbeedown](https://github.com/andrewosh/hyperbeedown) and fed into [LevelUP](https://github.com/Level/levelup).

### Is hypercore network traffic end-to-end encrypted?

Yep. With [Noise protocol](https://github.com/mafintosh/noise-network). Same protocol is used by WhatsApp. But as, always with end-to-end encryption, you need to watch out for the cases when you introduce a proxy, as needed to support Hyperswarm in browser. 
Need help with this.

### Is hyperswarm network traffic end-to-end encrypted?

No. 
Need help with this.
