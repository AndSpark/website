<template>
	<div>
		<avue-crud
			:page="page"
			:data="data.data"
			:option="option"
			@row-save="create"
			@row-update="update"
			@row-del="remove"
			@on-load="changePage"
			@sort-change="sortChange"
			@search-change="search"
		></avue-crud>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class CourseList extends Vue {
	@Prop(String) resouce: string | undefined
	data = {}
	option: any = {}
	page = {
		total: 0,
		currentPage: 1,
		pageCount: 2,
		pageSize: 2,
		pageSizes: [2, 5],
	}
	query: any = {
		limit: 2,
		page: 1,
		sort: {},
	}

	async search(where: any, done: any) {
		for (const key in where) {
			const field = this.option.column.find((v: { prop: string }) => v.prop === key)
			if (field.regex) {
				where[key] = { $regex: where[key] }
			}
		}
		this.query.where = where
		this.fetch()
		done()
	}

	async sortChange({ prop, order }: any) {
		if (!order) {
			this.query.sort = null
		} else {
			this.query.sort = {
				[prop]: order === 'ascending' ? 1 : -1,
			}
		}
		this.fetch()
	}

	async changePage({ currentPage, pageSize }: any) {
		this.query.limit = pageSize
		this.query.page = currentPage
		this.page.pageSize = pageSize
		this.fetch()
	}

	async fetchOption() {
		let res = await this.$http.get(`${this.resouce}/option`)
		this.option = res.data
	}

	async fetch() {
		let res = await this.$http.get(`${this.resouce}`, {
			params: {
				query: this.query,
			},
		})
		this.data = res.data
		this.page.total = res.data.total
		this.page.pageCount = res.data.lastPage
		this.page.currentPage = res.data.page
	}

	async create(row: any, done: any) {
		await this.$http.post(`${this.resouce}`, row)
		this.$message.success('创建成功')
		this.fetch()
		done()
	}

	async update(row: any, index: any, done: any) {
		const data = JSON.parse(JSON.stringify(row))
		delete data.$index
		await this.$http.put(`${this.resouce}/${row._id}`, data)
		this.$message.success('修改成功')
		this.fetch()
		done()
	}

	async remove(row: { _id: string }) {
		try {
			await this.$confirm('确认要删除吗？')
		} catch (e) {
			return
		}
		await this.$http.delete(`${this.resouce}/${row._id}`)
		this.$message.success('删除成功')
		this.fetch()
	}

	created() {
		this.fetchOption()
		this.fetch()
	}
}
</script>

<style></style>
