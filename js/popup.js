(() => {
	const url = new URL(location.href);
	const feedUrl = new URL('/feeds/videos.xml', location.origin);
	if (url.pathname.startsWith('/channel/')) {
		const channelId = location.pathname.split('/')[2];
		feedUrl.searchParams.set('channel_id', channelId);
		console.log(feedUrl.toString());
	} else if (url.searchParams.has('list')) {
		feedUrl.searchParams.set('playlist_id', url.searchParams.get('list'));
		console.log(feedUrl.toString());
	}
})();