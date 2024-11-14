function Card() {
	return (
		<article key={`player ${beer.sku}`} className="temp-card">
			<p>{beer.name}</p>
			<p>{beer.abv}</p>
		</article>
	);
}
