# Simple Cloud

Matching vast aray of AWS services is a daunting task, and it is not our goal Cloud. We choose to focus on Cloud services sufficient to run Personal Cloud. 

## Design goals

### Zero cost at zero usage

Due to this design goal we aim for components that run in embedded fashion (libraries) not as servers, which otherwise need to be managed and that take up RAM and CPU resources.

### Execution Continuum

Users should feel free to move around execution contexts and **freedom** is our main goal. 1) Users today are locked into their environments, whether it is the Cloud of hyperscalers, mobile platforms with their lock on the app store, or a specific Data Center. 2) Developers should be able to design, develop and test locally, for new ideas to come to fruition faster. 

### Zero-config 

The network should be self-organizing, self-healing and require minimum, if any administration. 


## Blueprint V1 {#blueprint-v1}

We can start on a local machine, and then rent [bare metal servers on AWS, Azure, GCP, packet.com](https://github.com/weaveworks/ignite/blob/master/docs/cloudprovider.md), [steadfast](https://comparisons.financesonline.com/hostings/linode-vs-steadfast-bare-metal-dedicated-servers), [OVH](https://www.ovhcloud.com/en/bare-metal/), etc. (packet seems the cheapest at $51 a month). Note that [fly.io uses packet.com](https://www.packet.com/customers/fly/). Or we can use [VMware Fusion with nested virtualization](https://thenewstack.io/tutorial-getting-started-with-firecracker-on-vmware-fusion/).  \
Here is the plan:


### Multi-tenant Network {#multi-tenant-network}

We can avoid using [OpenStack Neutron](https://docs.openstack.org/mitaka/networking-guide/) which is too complex. Instead we could use a combination of


### Routing, Balancing and Request distribution {#routing-balancing-and-request-distribution}

HTTPS proxy with websockets support, as a replacement for AWS API Gateway (maybe we can use [Fly.io’s Wormhole](https://github.com/superfly/wormhole), or we could use [Envoy](https://www.envoyproxy.io/) that is a modern replacement for NGINX, which adds programmability)

We may be able to do routing requests from HTTP proxy to FireCracker VM, with [Wireguard](https://www.wireguard.com/netns/). Note that Fly.io offers 2 options 1) to terminate TLS and then route over [Wireguard](https://www.stavros.io/posts/how-to-configure-wireguard/) to FireCracker VM, and 2) route TCP directly to FireCracker VM.

We will need to connect proxy to MQTT broker and to FireCracker. 

We delay offering custom domains, if not we can skip complexity of SSL certs [auto-generation](https://fly.io/blog/how-cdns-generate-certificates/), 

Delay offering DNS services, possibly with [DNS over HTTPS](https://fly.io/docs/app-guides/run-a-private-dns-over-https-service/).


### VM for serverless {#vm-for-serverless}

Launching Firecracker VMs with docker container inside.



1. Fly runs Docker images in Firecracker. Not sure what they use, but we can use [Ignite](https://github.com/weaveworks/ignite).
2. Unikernels like Nanos & OSv will have 10x shorter boot time of user’s code inside the FireCracker VM (shorter boot time means we are closer to zero-cost at zero usage as we do not need to run pre-warmed VMs).
3. To mask Firecracker start time, we should launch it on the first round of TLS handshake, using [SNI in the first TLS packet](https://blog.cloudflare.com/eliminating-cold-starts-with-cloudflare-workers/), like Cloudflare does. Maybe [using this](https://cnpmjs.org/package/tls-router)? 
4. Next-gen FireCracker - [rust-vmm](https://github.com/rust-vmm/community), joint effort of Alibaba, AWS, Cloud Base, Crowdstrike, Intel, Google, Red Hat. Snapshotting is being actively developed and we need it to reduce cold starts. Rust-vmm is rather a number of reusable modules, which FireCracker and other execution environments will use. Intel’s goal, for example, is long running HPC, not short-lived serverless workloads. 


### Orchestration of execution contexts {#orchestration-of-execution-contexts}

[NOMAD](https://www.hashicorp.com/products/nomad/) + [Firecracker](https://kylejones.io/a-deep-dive-into-aws-firecracker) (AWS Lambda replacement), like [Fly.io does it](https://news.ycombinator.com/item?id=22616857&p=2). Alternative is [Kata Containers with FireCracker](https://medium.com/@gokulchandrapr/kata-containers-on-kubernetes-and-kata-firecracker-vmm-support-28abb3a196e7).


### Single-tenant DB and text search {#single-tenant-db-and-text-search}

[Lucene](https://www.morling.dev/blog/how-i-built-a-serverless-search-for-my-blog/) is a mature embedded text-search engine which for Personal Cloud can double as AWS DynamoDB replacement (it is written in Java so it only just now became possible to [run in serverless](https://www.morling.dev/blog/how-i-built-a-serverless-search-for-my-blog/) mode). 

CockroachDB Lab offers [managed DB service for single-tenant custers](https://www.cockroachlabs.com/docs/cockroachcloud/stable/). Cockroach seems like the best choice for enterprise serverless DB.


### Single-tenant [MQTT broker](https://github.com/moscajs/aedes) {#single-tenant-mqtt-broker}

_(replacement for AWS IoT Broker). _

Ideally this should be an embedded broker (a library, not a server). It may be possible to connect mqtt clients without a broker (brokerless MQTT).


### Multi-tenant AWS S3 open source alternatives {#multi-tenant-aws-s3-open-source-alternatives}

[CEPH](https://www.redhat.com/en/about/press-releases/red-hat-unveils-red-hat-ceph-storage-2-enhanced-object-storage-capabilities-improved-ease-use?sc_cid=701600000011gf0AAA) (market leader, used by many Telcos), Swift (used by OVH), [MinIO, SoftIron and OpenIO](https://www.openio.io/blog/3-recent-studies-confirm-that-object-storage-is-finally-adapted-to-high-performance-use-cases) (new simpler high-performance alternatives). To delay setting up S3 managed service we can use European S3-compatible providers, like [OVH](https://www.ovh.com/blog/ovhcloud-object-storage-clusters-support-s3-api/). [ArubaCloud](https://www.arubacloud.com/object-storage/pricing.aspx). For reference see other [AWS services open source alternatives](https://github.com/guenter/aws-oss-alternatives).


### Multi-tenant file system  {#multi-tenant-file-system}

Serverless needs a persistent filesystem between invocations, to be used for databases and text search. Open source implementation is [OpenStack Manila](https://docs.openstack.org/manila/latest/), and CephFS, but we need to keep looking for a simpler one.


## Personal Data Store, on Hypercore {#personal-data-store-on-hypercore}

We are exploring how to use Hypercore to provide Reliable storage for files, large-size media, and databases 


### Key differentiators {#key-differentiators}



1. **Decentralized Privacy**. Allows to build private data applications, with functionality similar to the centralized, Google-style apps. 
2. **Data Continuum**. Works in the Cloud **and** on local PCs and mobiles. Many cloud-native systems only work in the Cloud, which limits their scope of use, and makes it extremely difficult for developers to debug and test, leading to a huge loss in productivity.


### Use cases {#use-cases}



1. **Durability, Load balancing, and Mobility**. Replicate Files and Databases In-Data Center (DC) and inter-DC. Always route to invoke computation near the desired data replica. This provides resilience to hardware failures (resilience), allows scheduled hardware maintenance by forwarding traffic to other machines (mobility), allows to shift load between machines (load balancing), and allows users to move to another DC (mobility).
2. **Replicated and shared databases. **Compliant to Level API, which allows it to be a drop in replacement for AWS DynamoDB. Replicated databases can be used for durability, load balancing and mobility, but also for analytics applications that are performed on a replica, offloading the operational DB.
3. **Compliance**. Provides immutable log of all changes. Provides versioning for both databases and files. 
4. **Recovery**. Provides point-in-time restore from any past version. This simulates DynamoDB point-in-time and restore for a filesystem. This can also be used as snapshots, as allows to checkout the store, tagged at a particular version. This may be used in devops and development for investigations. 
5. **Shared files and folders** (like Dropbox or Google Drive), as shared drive for family and friends, teams and companies. Provides seamless replication to a friend’s machine when the folder is shared. 
    1. This also increases the durability, as it is symmetric. Any downloaded file can be seamlessly shared back with the owner.
6. **Shared document editing**. Like Google Docs and Google Slides Because hypercore is realtime and P2P, it enables simultaneous editing, without a central site. Good to use with https://github.com/yjs/yjs
7. **Reliable messaging + media**. Messages and media (of any size) are delivered from mobiles to server and back reliably in view of intermittent connectivity.
8. **Group messaging,** using publish / subscribe capability of Hypercore. Supports large size media. E.g. 150mb file can’t be shared in a group on WhatsApp or Skype.
9. **Direct media sharing** between two users over the Internet, bypassing the server, which is faster, cheaper and more secure, as there is no intermediary. 
10. **Research data sharing**. Supports any size scientific data sets, which can be used by research institutions. Supports bittorrent-stile download acceleration by downloading from multiple sources simultaneously.
11. **Gigantic Database streaming**. Allows loading and verifying integrity of chunks from untrusted peers (like Bittorrent for DB)
12. **Secure local sharing**, like Apple's Airdrop. This is supported by local peer discovery with MDNS. Allows sharing on LAN, without going to the internet. 
13. **Live streaming. **Allows to start downloading media, before the whole file is uploaded. Allows video viewing from any point, and fast forward is enabled by sparse download capability. 
    2. Concerts and podcasting.
    3. Security camera: at the door or inside (nanny cam).
    4. Drone cameras. 
14. **CDN. **Can be used to build a CDN, distributing files to the edge, and distributing load between the replicas. Additionally, due to bittorrent-like functionality 
    5. saves bandwidth costs by bandwidth sharing, turning media watchers into uploaders
    6. can accelerate download as allows to load chunks from multiple peers simultaneously. This is especially important for 4K and VR content.
    7. Static storage friendly. Files and databases can be served from static storage, as in CDNs. Easily archivable to S3, and can be served from there.
    8. Bridge to [HTTP](https://awesome.datproject.org/dathttpd) for browsers.  
15. **Continuous Backup**. Personal and team data backup. Usable on mobiles, desktops, and servers. Archivable to S3 so backup is easy.
16. **Social key recovery**. Can be used with [Dark Crystal](https://darkcrystal.pw/). This is essential for any crypto applications.
17. **IoT** signals live streaming 
    9. Wearables signals
    10. Home signals and cameras 
    11. Car signals and cameras
    12. Equipment signals streaming
    13. **todo**: on IoT devices will require purging older data


### Features {#features}



*   **Realtime.** Get the latest updates to the log fast and securely.
*   **Data integrity / Temper-proof.** Protects every data item from unauthorized modifications and assures that old data is intact (similar to blockchain, where all transactions are added to a merkle tree and new blocks linked to old ones. In hypercore, the writer signs merkle tree root hash on any change, and versions any data changes. This creates a nice audit trail).
*   **Transport independent.** Can use TCP/IP, webrtc, websockets as transport. Transport can be secured with Noise protocol (used in WhatsApp and Signal Messengers).
*   **Composable**. Can be multiplexed
    *   Level API
    *   Random Access API 
    *   Stream API
*   **Provides Change Data Management**. Allows additional applications to create search indexes, load into data warehouses, provide ETL, etc. 
*   **Editable**, unlike bittorrent**.**
*   **Enables P2P connections. **Provides [Hyperwarm DHT with hole punching](https://github.com/hyperswarm/dht). This is a crucial building block for all P2P applications to avoid the use of central servers. P2P apps are sitting behind the firewalls (and routers) and can’t directly connect to each other.. 
*   **Flexible**. Hypercore is designed as composable modules. You can use it as a foundation for a multitude of distributed privacy-first applications. 


## **Blueprint V2, codename ‘Cloud Bevy’, on Hypercore** {#blueprint-v2-codename-‘cloud-bevy’-on-hypercore}

_This section is a blueprint version 2 corresponding to the first milestone of a Cloud Bevy ‘Roadmap’ slide. The goal is to have enough info for developers to start coding._

**New Idea: Self-organising swarm **of machines, discoverable with Hyperswarm and cluster management via Hypercore feeds. 

This new idea is to create a self-healing network (swarm) of Personal Clouds that requires an absolute minimum management. We are using the term swarm to refer to a swarm of fish, flock of birds, a pack of animals, that is a self organizing group of many independent entities.

In this case entities are Personal Cloud instances and machines in Data Centers that joined Cloud Swarm.


### Routing {#routing}



1. **Nodejs as a proxy / router**. 
    1. **Programmable** [Fast-proxy](https://github.com/fastify/fast-proxy) (based on [Fastify](https://www.fastify.io/) and [Restana](https://github.com/jkyberneees/restana)) is on par with Nginx speed-wise (and will be 2x in NodeJS 15). But the [fastest is uWebSockets](https://github.com/uNetworking/uWebSockets/tree/master/benchmarks), by far. Others are [0http](https://www.npmjs.com/package/0http), [Rayo and Polka](https://github.com/fastify/benchmarks/issues/100). So no need for standalone proxies like [Nginx, Envoy, Haproxy](https://matscloud.blogspot.com/2019/02/kubernetes-proxy-envoy-vs-nginx-vs-ha.html), or [Fly.io’s Wormhole](https://github.com/superfly/wormhole) (**todo**: need to make use of [its WebSockets support](https://github.com/fastify/fastify-websocket), and explore HTTP/3 (QUIC) support).
    2. **Hypercore-friendly**. Fast-proxy runs in NodeJS so it can use Hyperswarm to discover new machines joining and get Personal Cloud routing data from all Hypercore feeds from all Data Centers and their Machines. We could use feeds to share maintenance events, and cluster leader election (if needed), and load metrics (below). 
    3. **Monitoring **to enable load balancing and failover. See [monitoring](https://awesome.datproject.org/dathttpd#metrics-dashboard), proxy [statistics](https://github.com/jkyberneees/restana#application-performance-monitoring-apm), [hyperhealth](https://awesome.datproject.org/hyperhealth#). 
    4. **Alternative 1**: Maybe instead of routing we can use redirect? This approach could provide the same load balancing as a proxy, but avoid CPU and network use and delays.
        1. When direct P2P connections from behind the firewall can’t be established, we can fall back to a proxy.
    5. **Any PC can Redirect**. Could any Personal Cloud serve a double duty as a router? This would remove the need to manage a fleet of API Gateways. With the redirect instead of a proxy approach, this becomes even more feasible, as Personal Cloud will not incur high costs for helping other Personal Clouds (redirect is incomparably cheaper, especially if livestreaming is involved), and unlike the proxy it is not privy to other’s traffic. 
    6. **Alternative 2: Client-based load balancing.** Even better, potentially all clients of a Personal Cloud can get a feed that informs them which Personal Cloud will better serve them now. This avoids a redirect round-trip. 
        2. This could work in combination with [DNS over HTTPS](https://blog.stackpath.com/serverless-dns-over-https-at-the-edge-doh/) (DoH) to reduce round trips, increase privacy, and possibly simplify SSL certificate management (with [LetsEncrypt](https://letsencrypt.org/docs/client-options/), as used by [hypercloud](https://github.com/dat-land/hypercloud) and [dathttpd](https://awesome.datproject.org/dathttpd)). 
        3. After the initial DNS reply, real-time feed can update load balancing tables on the client. 
        4. But how to avoid latency, ensuring DoH requests go to the server closest to the user? Could [Anycast](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) help?
        5. Why not use Hyperswarm on a client for discovery of replicas? We will need to solve a UDP problem in browsers (see how webtorrent).
2. **Data Centers in Uber swarm**
    7. **Zero-conf**. Each machine in DC joins Hyperswarm and orients itself from there.  \
**Details TBD. **E.g. new machine can say - give me replicas for some Personal Clouds, I am in Data Center X, location Y, I have that much disk space, etc. An existing replica of some Personal Cloud could say, I could improve my locality and performance if I move from another machine I am using, and initiate the migration.
        6. Note that processes on the same LAN (machine, DC rack) can do peer discovery over MDNS, not DHT. Could it be used for speed? Security? Grouping of machines?
    8. **Independent machines**. Interestingly, a machine does not even need to be part of DC to join. 
        7. But it will need to be certified to run Personal Cloud (for data protection and to join the market). 
        8. This machine could be a personal hardware, or run in any number of VPSs like Linode.
3. **Software Distribution of Personal Cloud to Data Centers**. Options:
    9. Docker. Personal Cloud for one machine in a Data Center can be released in a OCI-standard Docker container format to be loaded by Weave Ignite into a FireCracker KVM.
    10. VMWare VM image with Personal Cloud pre-installed.
    11. Should each Nodejs process actually run in a FireCracker?
4. **Sandboxing**
    12. JS or WebAssembly code can run in [Worker Threads, like CloudFlare](https://medium.com/@zackbloom/isolates-are-the-future-of-cloud-computing-cf7ab91c6142). That is the code on top of Hypercore does not need FireCracker (VM level) isolation. It only needs Worker Threads isolation, if that. With Worker Threads, a single Node.js process can run hundreds or thousands of isolated customer requests.
        9. CPU cap (e.g. 1s). Like CloudFlare - Setup linux timer and [terminate Worker](https://nodejs.org/api/worker_threads.html#worker_threads_worker_terminate). This will kill a hard loop as well.
        10. RAM cap can be controlled with [ResourceLimit](https://nodejs.org/api/worker_threads.html#worker_threads_worker_resourcelimits) Workers API (Node.js 13), we will receive [an exception](https://stackoverflow.com/questions/61256179/err-worker-out-of-memory-in-nodejs-worker-threads), so we can log it and inform the app owner.  CloudFlare also monitors overall Node.js process ram usage and [kills least used Workers](https://www.infoq.com/presentations/cloudflare-v8/).
    13. **Contexts. **Instead of creating a new worker thread, the safe or same-customer code we can [run in Contexts](https://stackoverflow.com/questions/19383724/what-exactly-is-the-difference-between-v8isolate-and-v8context).
    14. **Pools**. For same-customer code we can also use Worker Threads Pools (great code example in [Node.js doc on Threads](https://nodejs.org/api/async_hooks.html#async-resource-worker-pool). Also many [Thread pool packages](https://npm.io/search/keyword:threadpool)).
    15. **Safe custom code**. A Tradle message may invoke custom untrusted code as a bot plugin or a custom bot (later more types of custom code to be allowed). 
        11. We should examine for security all plugins that use native code libraries. 
        12. WebAssembly. Fastly claims 5micro seconds startup vs 5ms of CloudFlare Workers. [WebAssembley is defining the notion of nanoprocesses](https://hacks.mozilla.org/2019/11/announcing-the-bytecode-alliance/).
    16. **Unsafe custom code.** FireCracker VM can be used as a fallback for all other custom code that is not JS or WebAssembly, needs large ram, has large size dependencies, needs to run longer, etc. 
        13. FireCracker will soon support encrypted memory and block storage, to protect from surveillance by the host. No other solution can possibly beat that. 
5. **Data Isolation**
    17. Each app uses its own Hyperbee(s). 
    18. A Hyperbee per DynamoDB table
    19. This avoids the need for multi-write in many cases
    20. For the remainder of cases where multi-writer is needed, we should use HyperDB.
    21. Since we will be using a whole bunch of feeds, we should [Corestore](https://github.com/andrewosh/corestore) to manage them. Corestore also provides deterministic key gen from MasterKey.
6. **Multi-device**. No need to merge feeds from other devices. Each device subscribes to feeds from others. Multiplex feeds into a chat directly in the app (mabe with [multifeed](https://github.com/mafintosh/multifeed)?).
7. **Transport**
    22. **Feed from the app to Personal Cloud** must use WebSockets (as opposed to TCP) to work in browsers and to pass through firewalls. 
    23. **Direct Feeds** between devices may be able to use TCP/IP in native apps, but must use [Webrtc in the browser](https://github.com/RangerMauve/hyperswarm-web) (no TCP there). 
        14. **Fallback to proxy mode**. Even in native apps behind some corporate firewalls both TCP and [Webrtc might be blocked](https://webrtchacks.com/true-end-to-end-encryption-with-webrtc-insertable-streams/), so must fallback to proxy via Personal Cloud using WebSockets.
    24. **Security**. 
        15. Replicating hypercore feeds over Noise protocol between machines in DC obviates the need for WireGuard (we could later examine WireGuard as an optimization though, with WireGuard config and iptables routes generated dynamically, and then routing itself to work statically, like Nomad Consul does it).
        16. Noise is not needed otherwise, as both Secure WebSockets (wss://) and Webrtc are encrypted. But Noise may need to be used for handshake (**is it?**). Feed Options (encrypted: false, noise: true)
8. **Tradle Engine can be implemented on Hypercore**. 
    25. reliable messaging (for which today we use inbox, outbox tables in DynamoDB + MQTT for transport), establishing connection to MQTT which is currently convoluted, via AWS anonymous IAM), Events log, 
    26. Also: identity verification, message sequencing
    27. Rolling data integrity, as Hypercore uses Merke trees. 
    28. Remains: integration with the blockchain, ORM to DynamoDB.
9. **Secrets/passwords/keys backup/restore with friends**. This splits the [secret into N parts and allows restore with M of N replicas](https://github.com/jwerle/hyper-secret-sharing) (a number of [other implementations](https://github.com/topics/shamir-secret-sharing?l=javascript&o=desc&s=stars) exist). We can use it for clients. See also [Consento](https://consento.org/), an open source app for this. 

**Questions:**



1. **Can data be deleted**? [Somewhat](https://discordapp.com/channels/709519409932140575/709519410557222964/755404488415772746) - you can [clear your content locally](https://github.com/hypercore-protocol/hypercore#feedclearstart-end-callback), but if someone replicated it already, you can’t force them to clear. Also, internal data integrity records are still kept, but they do not leak any data (Merkle tree hashes are kept, so you can keep appending data to your log even if you clear the contents). Use cases:
    1. Chat. You can delete a chat message locally./ To delete the chat message at recipient(s) need to send a custom some message “please delete this”.
    2. Mobile. You can delete photos from mobile to save space, but keep them on a replica (your other PC or a Personal Cloud).
2. **Hyperbee**: Is it only one Hyperbee per Hypercore? Yes. [But one replication stream can carry many Hypercores](https://discordapp.com/channels/709519409932140575/709519410557222964/755415844808556594). Use corestores to manage multiple hypercore feeds, with permissions.
3. **Hyperswarm: **does it allow some filtering of peers, e.g. readers / writers, or some cryptography-based primitives? 
4. **Hyper**: who is using Hypercore modules? 
    3. Bitfinex, major crypto exchange uses it in its microservices framework [Grenache](https://github.com/bitfinexcom/grenache). 
5. **Does Hypercore work in the browser, on mobile? **Yes. Hypercore is transport independent. One can use webrtc to peers or websockets to server. 
6. **Does Hyperswarm work in the browser, on mobiles?** Not in browsers, but [workarounds exist, tracked here](https://github.com/hyperswarm/hyperswarm/issues/62). Difficulty is due to the use of UDP, which is not available in the browser. On mobile NAT hole punching may not succeed. On PCs some corporate firewalls may also block UDP. Need to bridge to DHT over websockets or webrtc. [WebTorrent uses webrtc](https://webtorrent.io/docs) for that, but how are they working without a signaling server? There is an Hyperswarm implementation [that uses 2 servers for signaling](https://github.com/RangerMauve/hyperswarm-web).
    4. Note that you need to use a [diff buffer in Browser](https://github.com/hypercore-protocol/hypercore#api) (unless rn-nodeify fixed it?) and a different random-access-memory. 
7. **Is there a permissioning system? **[Yes](https://discordapp.com/channels/709519409932140575/709519410557222964/755478198313287750)**. **Permissions are based on public / private key pairs. There are two key pairs, the original ones (present since Hypercore birth) and a keypair generated by Noise protocol, which was added in V8. 
8. Alternatively, we could use voting for a swarm leader selection, where a machine can be assigned as a leader for a particular Personal Cloud. Leader election is tricky though. **Can Hyperswarm help**?
9. If Node.js process dies, who will restart it? Se  [Nodemon](https://www.digitalocean.com/community/tutorials/workflow-nodemon), and [other methods like, PM2](https://blog.heroku.com/best-practices-nodejs-errors).
10. **Updating the whole Data Center**. How to mass update Node.js servers in one or more Data Centers? We probably need to design an Updater that will to fetch and restart (needs to be absolutely minimal to avoid the need to update the Updater)


### Questions  {#questions}



1. How to link from Hyperbee to Hyperdrive?
2. How to discover all feeds that the peer can give us?
3. Sparse DB? E.g. will be needed for DNS of all Personal Clouds in data center nodes (see [dat-dns](https://github.com/datprotocol/dat-dns)).
4. How announcing of discoveryKey works with multiple peers for bittorrent-style downloading.
5. How to do authentication? To allow only certain peers to receive the feed. It is supported [by Noise, see here](https://github.com/mafintosh/noise-network) and [here](https://mafinto.sh/blog/introducing-hypercore-8.html).
6. Is it multiprocess-save? Can two processes write to the feed simultaneously?
7. [Hypercore storage Encryption](https://ledger-git.dyne.org/CoBox/cobox-resources/src/branch/master/ledger-deliverables/2_work-plan/mvp/mvp-design.md). [hypercore-encrypted](https://www.npmjs.com/package/hypercore-encrypted) a wrapper around hypercore that supports encryption. [ciphercore](https://github.com/telamon/ciphercore) a wrapper for hypercore that provides content encryption, allowing **blind replication** (friends keeping your data without being able to read it)
8. How to support multi-writer with different private keys? This today requires each to write to their own feed, but how to merge those feeds later?
    1. Hypermerge uses the pattern that works for one multiple devices of one Person and multiple replicas of Personal Cloud of one person.
    2. HyperDB for Enterprise/SMEs (obsolete). Instead i would need Hyperbee that searches in multiple Hyperbees. 
9. Can it work under Dynalite? Theoretically yes, as supports Level API, but what about creation of tables and indexes?
10. Can it be used for AWS IoT broker replacement (which uses MQTT)?
11. How to establish security with replication?
    3. Keys management
    4. How to create encrypted replicas. 
12. Does it support Erasure coding?
13. How to route from API Gateway (reverse proxy)? Consider using hooks in [Node.js based fast-proxy](https://thejs701816742.wordpress.com/2019/07/04/node-js-api-gateway-a-developer-perspective/) 
    5. each pC gets external IP6 and 3 internal IP6 of 3 replicas. Router routes at IP level via a static table to the right machine in the right datacenter. On that machine Hyperdrive does not even need to run in a Sandbox (later it can run in webassembly). When the Tradle message comes in, it can then launch FireCracker and use the replicated data. It just needs to find the right dir. Hm, we still need to manage disk space. 
    6. We can use V8 Isolates, formalized in Nodejs v14 as [Worker Threads](https://nodejs.org/api/worker_threads.html))? Maybe **no need for FireCracker, if just replicating the data**, as Hypercore is a fairly trusted set of modules that are ok to run with this level of isolation. 
    7. Also, we route to WebAssembly first, like Fastly serverless? We can then launch FireCracker or V8 Isolate locally instead of doing it on the Proxy (is it a sidecar pattern used in service mashes?).
14. Can you delete in local feed, but keep in remote feed? This is needed to keep only a subset of photos on devices, as it has limited storage space.
15. Multi-writer for lost keys, multiple devices. How to preserve ownership over multiple PK, each per device  This is partially supported via mounts in Hyperdrive 10 we need multi-writer for multi-device and multi-feed for groups
16. Anonymity of IP addresses, exposed by Hyperswarm. Maybe [via I2P](https://dat.discourse.group/t/feature-support-i2p/62/6)?
17. Anonymity of static PK
18. Encryption:  [https://github.com/RangerMauve/p2plex](https://github.com/RangerMauve/p2plex)  and  https://github.com/mafintosh/noise-network
19. Work on mobile is not complete yet. Help complete this [Hypercore in React Native](https://dat.discourse.group/t/dat-and-react-native/184) project.
20. Can it be used for Contact Tracing? See how [DHT can be used](https://eprint.iacr.org/2020/398.pdf) to completely avoid using a central server. 
21. Compare how we use Merkle trees now with Hypercore)


## Orchestration Algorithm for Cloud Bevy {#orchestration-algorithm-for-cloud-bevy}

A group of machines in Data Centers need to be managed. This is the algo.

Imagine Personal Cloud Lenka replicated on machines Lenka 1, Lenka 2, Lenka 3

**Design 1**

Mounted Hyperdrives, Dir per MyCloud, and dir per MyCloud replica in it

Lenka 1 creates Hyperdrive Lenka 1

If Hyperdrive Lenka exists, it mounts  Lenka 1 inside it.  - will not work as only Lenka owner can mount sub-dir

**Design 2**

Hypermerge on Hypertrie (KV store) named Lenka

Key: Lenka  Value: {

  ‘Lenka-1-address’:	{‘machine-load-last-minute’: ‘5’, ‘heartbeat’: ‘&lt;time>’}, 

  ‘Lenka-2-address’:	{‘machine-load-last-minute’:20’, ‘heartbeat’: ‘&lt;time>’},

  ‘Lenka-3-address’:	{‘machine-load-last-minute’:40’, ‘heartbeat’: ‘&lt;time>’} 

}

**Design 2.1**

Hypermerge on Hyperbee (KV + index) named Lenka with key-values:

  ‘Lenka-1-address’:	{‘machine-load-last-minute’: ‘5’, ‘heartbeat’: ‘&lt;time>’} 

  ‘Lenka-2-address’:	{‘machine-load-last-minute’:20’, ‘heartbeat’: ‘&lt;time>’} 

  ‘Lenka-3-address’:	{‘machine-load-last-minute’:40’, ‘heartbeat’: ‘&lt;time>’} 

When Lenka is initiated, it discovers empty slot, and sends a request to Machine: create Lenka MyCloud

**Questions**

1. Each Lenka MyCloud monitors it, e.g. they discover Lenka 3 is down as her heartbeat was not updated

    1. Variant1: Leader does it (leader is not ideal)

    2. Variant2: Lenka 1 and Lenka 2 discovered it at the same time and both may ask EmptySlot simultaneously to create Lenka 3, not cool. 

2. How does EmptySlot service work? Use probability - ask 100 machines to start Lenka, some will? 

3. Alternatively need to coordinate: 

4. How will Lenka(s) subscribe to each other’s Hypercores?

5. How to provide MyCloud IP address obfuscation? If we redirect, the client will learn IP eventually. Unlike fly.io this is a Personal Cloud, and IP tracking is undesirable. So the sender may need to somehow get the ‘right’ to send, given to it by the recipient. If no such right, instead of redirecting we should return an error. This way IP can be periodically changed.

6. Maybe Lenka 2 when it gets an update can send replication requests to Lenka 1 and 3 directly. Otherwise they need to listen to each other all the time for possible changes, which is much harder in serverless (here QUIC is important for low Round Trip Time (RTT) as we can't keepalive and thus connection cost is significant.

    1. If  push replicas are not possible, maybe just a ping for them to know to request a replica ? Drawback is that the replica may fail and no-one will restart it.


## User Interface ideas {#user-interface-ideas}

Note [webtorrent.io](https://webtorrent.io/) below showing peers that help stream the content.  \
Also, see [who uses webtorrent](https://webtorrent.io/faq) to get an idea for video transcoders, players, etc. 



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")

