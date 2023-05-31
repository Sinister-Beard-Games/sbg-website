import { defineStore } from 'pinia'
import StoryblokClient from "storyblok-js-client";

const updateStock = (stockAmount, count) => {
    if(stockAmount === "") {
        console.log("Infinite copies available")
        return ""
    }
    if(stockAmount-count <= -1) {
        console.error("Not enough stock to fulfil order")
        return stockAmount
    }
    return stockAmount-count
}

export const useProductsStore = defineStore('basket', {
    state: () => (
        {
            basket: []
        }
    ),
    actions: {
        reduceStock(product, count) {
            console.log({product})
            console.log({count})
            const Storyblok = new StoryblokClient({
              accessToken:  import.meta.env.VITE_STORYBLOK_TOKEN,
              oauthToken: import.meta.env.VITE_STORYBLOK_OAUTH_TOKEN
            });
            Storyblok.get(`cdn/stories/${product.parentId}`, {cv: Date.now()})
            .then( async (response) => {
                const story = response.data.story
                console.log("Products", story.content.products)
                for(let i=0; i<story.content.products.length; i++) {
                    if(product._uid === story.content.products[i]._uid) {
                        story.content.products[i].remaining_stock = updateStock(story.content.products[i].remaining_stock, count)
                    }
                }
                console.log({story})
                Storyblok.put(`spaces/${import.meta.env.VITE_STORYBLOK_SPACE}/stories/${product.parentId}`, {
                  "story": story,
                  "force_update": 1,
                  "publish": 1,
                  "cv": Date.now()
                }).then(response => {
                  console.log(response)
                }).catch(error => {
                  console.error(error)
                })




            }).catch(error => {
                console.error("GET ERROR")
              console.error(error)
            })
        },
    },
    persist: true
})
