var applicationId = '7bf09fcf87bfb4527df952241bbdd749adae427b9dfd95f5d1d70ea6d9adfae9'

new Vue({
	el:'#applicationPagination',
	data: {
		photos: [],
		totalPhotos: 0,
		countPhoto: 12,
		currentPage: 1
	},
	methods: {
		changeView: function(page){ 
			var options = {
				params: {
					client_id: applicationId,
					page: page,
					per_page: this.countPhoto
				}
			}

			this.$http.get('https://api.unsplash.com/photos', options).then(function(response){
				this.photos = response.data
				this.totalPhotos = parseInt(response.headers.get('x-total'))
				this.currentPage = page
			}, console.log)
		}
	},
	created: function(){
		this.changeView(this.currentPage)
	}
})


Vue.component('pagination', {
	template: '#paginationTemplate', 
	props: {
		current: {
			type: Number,
			default: 1
		},
		total: {
			type: Number,
			default: 0
		},
		perPage: {
			type: Number,
			default: 12
		},
		pageCount: {
			type: Number,
			default: 2
		}
	},
	computed: {
		pages: function(){
			var pages = []
			for(var i = this.pageStart; i <= this.pageEnd; i++){
				pages.push(i)
			}
			return pages
		},
		pageStart: function(){
			var start = this.current - this.pageCount
			return(start > 0) ? start : 1
		},

		pageEnd:function(){
			var end = this.current + this.pageCount

			return(end < this.totalPages) ? end : this.totalPages
		},

		totalPages: function(){
			return Math.ceil(this.total/this.perPage)
		},

		nextPage: function(){
			return this.current + 1
		},

		previousPage: function(){
			return this.current - 1
		}
	},
	methods: {
		First: function(){
			return this.pageStart !== 1
		},

		Last: function(){
			return this.pageEnd < this.totalPages
		},

		Prev: function(){
			return this.current > 1
		},
		Next: function(){
			return this.current < this.totalPages
		},

		changePage: function(page){
			this.$emit('page-changed', page)
		}
	}
})
