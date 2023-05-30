import { defineStore } from 'pinia'

export const useProductsStore = defineStore('basket', {
    state: () => (
        {
            basket: [

            ]
        }
    ),
    persist: true
})
