<script setup lang="ts">
import { computed, ref } from 'vue';
import { DateTime } from 'luxon'
import { formattedNumber } from '@/shared'
import { useAppStore } from '@/entities';
import type { ITransaction } from '@/entities/project/model';

const props = defineProps<{
  transaction: ITransaction
}>();

const appStore = useAppStore();

const dateTime = DateTime.fromJSDate(props.transaction.date);
const active = ref(false);

const activeMode = computed(() => appStore.getMode);
const formattedDate = computed(() => dateTime.toFormat('dd.LL.yyyy'));
const formattedAuthor = computed(() => props.transaction.author ? `от: ${props.transaction.author}` : null);
const formattedComment = computed(() => props.transaction.comment ? `комментарий: ${props.transaction.comment}` : null);
const formattedAmount = computed(() => formattedNumber( props.transaction.count ));
</script>

<template>
    <div :class="['transaction', {'active' : active}]" @click="active = !active">
        <div class="transaction-container">
            <div class="tradition-card__text-content text-content">
                <div class="text-content__title">{{ transaction.title }}</div>
                <div class="text-content__subtitle">{{ transaction.comment }}</div>
            </div>
            <div class="tradition-card__arrow">
                <img v-if="activeMode === 'receipts'" src="@/assets/img/arrow_up.png">
                <img v-else src="@/assets/img/arrow_down.png">
            </div>
            <div class="tradition-card__transaction-info transaction-info"> 
                <span :class="['transaction-info__subtitle', activeMode]">{{ formattedAmount }}</span>
            </div>
        </div>

        <div 
            v-if="active"
            class="transaction-sub-container"
        >
            <div class="transaction_sub-title">{{ formattedDate }}</div>
            <div class="transaction_sub-title">{{ formattedAuthor }}</div>
            <div class="transaction_sub-title">{{ formattedComment }}</div>
        </div>
    </div>
</template>

<style>
@import './transaction-card.pcss';
</style>