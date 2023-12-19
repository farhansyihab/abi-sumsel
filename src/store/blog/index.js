import { defineStore } from "pinia";

export const blogInfo = defineStore({
    id: "blogInfo",
    state: () => ({
        posts: []
    }),
    getters: {
        getPostById: (state) => (id) => {
            try {
                return state.posts.find(post => post.id === id)
            } catch (error) {
                return null
                console.log(error)
            }
        },
        getPostByIndex: (state) => (idx) =>{
            return state.posts[idx]
        }
    },
    actions: {
        SET_POSTS( posts) {
            this.posts = posts
        },
        fetchPosts() {
            const penyimpanan   = window.localStorage
            const entries       = penyimpanan.getItem("dataBlog")
            const posts         = JSON.parse(entries)
            this.SET_POSTS(posts)
          }
    }
})
