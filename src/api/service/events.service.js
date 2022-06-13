export default api => {
	api.Events = {
		getEvents() {
            return api.instance.request({
                method: 'get',
                url: `v1/currencies`,
            })
        },
        getCourse(amount,first,second) {
            return api.instance.request({
                method: 'get',
                url: `v1/exchange-amount/${amount}/${first}_${second}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd&useRateId=true`,
            })
        },
        getMinimal(first,second) {
            return api.instance.request({
                method: 'get',
                url: `v1/min-amount/${first}_${second}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd&useRateId=true`,
            })
        },
	}
}
