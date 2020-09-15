# Why hypercore

As we are exploring the design for running Tradle on Hypercore, this summarizes our findings. 

## What is hypercore 
Web's Hub and spoke technical architecture is the orime reason we have now the monopolies with billions of users, the size of which we never seen before.
Billion dollar fines for them seem to be issued every year now, but this is not a solution.
We need a new P2P architecture and Hypercore is it. 

P2P architectures are much harder to create than centralized, they are often less efficient (Bittorrent's download supert-speeds are an exception) and investors are less interested, as they do not produce monopolies that create outsized returns. 

Yet, we live in the age of the rise of decentralized and P2P tech renaissance. Notable is the whole crypto space, which helped launch decetralized VPNs, like [Orchid](https://www.orchid.com/), decentralized live streaming like [Theta.tv](https://theta.tv), etc. 

## Why Tradle on Hypercore
At Tradle we see a huge opportunity if

### Why use Hypercor if it is not mainstream?
It is a fact that Hypercore is 7 years old and still no runaway apps on it. So what gives?
Here is my take:


## FAQ

Many of the answers below are taken from Hypercore protocol discussion forum. All interpretations are ours, and so are the possible mistakes and misunderstandings. Please send corrections as pull requests. 

### Can data be deleted? 
[Somewhat](https://discordapp.com/channels/709519409932140575/709519410557222964/755404488415772746) - you can [clear() your content locally](https://github.com/hypercore-protocol/hypercore#feedclearstart-end-callback), but if someone replicated it already, you can’t force them to clear. Also, internal data integrity records are still kept, but they do not leak any data (Merkle tree hashes are kept, so you can keep appending data to your log even if you clear the contents). Use cases:
- Chat. You can delete a chat message locally./ To delete the chat message at recipient(s) need to send a custom some message “please delete this”.
- Mobile. You can delete photos from mobile to save space, but keep them on a replica (your other PC or a Personal Cloud).

### Hyperbee: Is it only one Hyperbee per Hypercore? 
Yes. But one replication stream [can carry many Hypercores](https://discordapp.com/channels/709519409932140575/709519410557222964/755415844808556594). Use corestores to manage multiple hypercore feeds, with permissions.

### Hyperswarm: does it allow some filtering of peers, e.g. readers / writers, or some cryptography-based primitives? 
Need help with this. Partial answer is that Hyperswarm DHT. 

### Hyper: who is using Hypercore modules? 
Need help with this. Partial answer is:
- Bitfinex, major crypto exchange uses it in its microservices framework [Grenache](https://github.com/bitfinexcom/grenache). 
- See at the bottom of [Hypercore protocol page](https://hypercore-protocol.org/). 
- See discussion forum where people [showcase their Hyper projects](https://discordapp.com/channels/709519409932140575/712037351244955809/712037741126221924). 

