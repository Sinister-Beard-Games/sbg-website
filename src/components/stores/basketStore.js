import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', {
    state: () => (
        {
            items: [

            ]
        }
    ),
    persist: true
})
