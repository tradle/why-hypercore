# Hypercore universe FAQ

Many of the answers below are taken from Hypercore protocol discussion forum. All interpretations are ours, and so are the possible mistakes and misunderstandings. Please send corrections as pull requests, or request commit rights. Questions that need answers are marked with **Need help with this**.

## General 
This section is for general questions. See other sections for questions specific to individual Hypercore modules.

## What are the main components / modules / packages?

- Hypercore, the underlying append-log-only data structure for all of Hyper universe. 
- Hypertrie, the key-value store, which is used by Hyperdrive as its directory structure.
- Hyperbee key-value and sorted range queries (as a database backend)
- Corestore - managing many Hypercores you typically end up authoring or replicating from others 

### What is the USP (Unique Selling Proposition) of Hypercore?

If one word, aside from P2P, can be added as a unique differentiator to Hypercore universe, it is **streaming**. You can think of it as video streaming, but now for data. You get almost immediate access, even though the data is not yet fully downloaded or never will be fully downloaded. This point needs to be repeated again and again, as streaming data (files, databases, and any other structured data constructs), just by itself, without any other wonderful Hypercore capabilities, may create a new class of applications, much like Netflix re-invented movie watching. This paradigm shift is one reason why Hypercore is hard to grok for app developers, it just requires full rethinking of our current architectures.

### What is the difference from BitTorrent and a wonderful WebTorrent?

Hypercore is built as a data and communications framework for modern applications. Applications need data structures, data needs to be editable. BitTorrent is inherently immutable (yes, proposals exist for extending BitTorrent to modifiable data but did they gain ground and are they the afterthought?). In Hypercore data editing is a first class operation.

WebTorrent is awesome, it pioneered access to BitTorrent in browsers and in that way its tech is helpful to Hypercore, but its mission statement was just that, while Hypercore is re-inventing BitTorrent. 

What
### I am concerned that Hypercore is not yet mainstream

It is a fact that Hypercore is 7 years old and still has no runaway apps built on it. So what gives, if it is so amazing, and it is! Here is my take, aside from making a  P2P framework being super-hard:

Many P2P apps struggle as they lack availability, durability and work in the unforgiving networking environments.

- Availability. For example, in a collaborative editing app like Google Docs, once you close your laptop, your collaborators can't get your latest content, if they were not online when you made edits. With Google, if you had a connection at the time of the last edit, it would have been made available to others. This is especially important for work across the timezones. So some master nodes that "seed" content are always discussed and tried (e,g, Hashbase), but they re-centralize things, and introduce permissioning, data sovereignty, data privacy and other challenges.

- Durability. We are spoiled with Google (and others) taking care of preserving our content. We pay a steep price of giving them everything on us, but this convenience is very hard to achieve in P2P world. Your peers may be good friends but there is no guarantee they will not lose your precious content. Many solutions are being tried, including those with Cryptocurrencies incentivizing users to keep content, but they all have technical and convenience frictions. Besides, who wants to be responsible for disseminating a potentially illegal content?

- Networking. Current Internet, with its routing and firewalling system is just hostile to P2P connections. Although Hyperswarm offers an ingenious NAT hole punching, there are too many edge cases, when it does not work on mobiles, needs workarounds in browsers and blocked by corporate firewalls. This does not mean it can't be used, we just need a fallback to serves acting as proxies. But this comes at the same price of decentralization.

### Can data be deleted? 

[Somewhat](https://discordapp.com/channels/709519409932140575/709519410557222964/755404488415772746) - you can [clear() your content locally](https://github.com/hypercore-protocol/hypercore#feedclearstart-end-callback), but if someone replicated it already, you can’t force them to clear. Also, internal data integrity records are still kept, but they do not leak any data (Merkle tree hashes are kept, so you can keep appending data to your log even if you clear the contents). Use cases:

- Chat. You can delete a chat message locally. To delete the chat message at recipient(s) need to send a custom some message “please delete this”.
- Mobile. You can delete photos from mobile to save space, but keep them on a replica (your other PC or a Personal Cloud).

### Hyperbee: Is it only one Hyperbee per Hypercore? 

Yes. But one replication stream [can carry many Hypercores](https://discordapp.com/channels/709519409932140575/709519410557222964/755415844808556594). Use corestores to manage multiple hypercore feeds, with permissions.

### Hyperswarm: does it allow some filtering of peers, e.g. readers / writers, or some cryptography-based primitives?

Need help with this.
Partial answer is that Hyperswarm DHT can hold some data, and Bitfinex recently helped [improve Hyperswarm DHT with that](https://discordapp.com/channels/709519409932140575/709519410557222964/755479495380697118).

### Hyper: who is using Hypercore modules?

Need help with this. Partial answer is:
- Bitfinex, major crypto exchange uses it in its microservices framework [Grenache](https://github.com/bitfinexcom/grenache). 
- See at the bottom of [Hypercore protocol page](https://hypercore-protocol.org/). 
- See discussion forum where people [showcase their Hyper projects](https://discordapp.com/channels/709519409932140575/712037351244955809/712037741126221924). 

