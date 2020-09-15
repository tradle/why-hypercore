# Why hypercore

As we are exploring the design for running Tradle on Hypercore, this summarizes our findings. 

##What is hypercore

## FAQ
### Can data be deleted? 
[Somewhat](https://discordapp.com/channels/709519409932140575/709519410557222964/755404488415772746) - you can [clear() your content locally](https://github.com/hypercore-protocol/hypercore#feedclearstart-end-callback), but if someone replicated it already, you can’t force them to clear. Also, internal data integrity records are still kept, but they do not leak any data (Merkle tree hashes are kept, so you can keep appending data to your log even if you clear the contents). Use cases:
- Chat. You can delete a chat message locally./ To delete the chat message at recipient(s) need to send a custom some message “please delete this”.
- Mobile. You can delete photos from mobile to save space, but keep them on a replica (your other PC or a Personal Cloud).

### Hyperbee: Is it only one Hyperbee per Hypercore? 
Yes. But one replication stream [can carry many Hypercores](https://discordapp.com/channels/709519409932140575/709519410557222964/755415844808556594). Use corestores to manage multiple hypercore feeds, with permissions.
