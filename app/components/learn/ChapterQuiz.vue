<script setup lang="ts">
import { getQuiz } from '~/data/quizzes'
import { nextChapterPath } from '~/data/chapters'

const props = defineProps<{
  chapterSlug: string
}>()

const questions = getQuiz(props.chapterSlug)
const { markQuizPassed, isQuizPassed } = useLessonProgress()

const answers = ref<number[]>(questions.map(() => -1))
const submitted = ref(false)

const score = computed(() =>
  answers.value.filter((answer, index) => answer === questions[index]?.correctIndex).length
)

const passed = computed(() => score.value === questions.length)

const nextChapter = computed(() => nextChapterPath(props.chapterSlug))

function submit() {
  submitted.value = true

  if (passed.value) {
    markQuizPassed(props.chapterSlug)
  }
}

function retry() {
  answers.value = questions.map(() => -1)
  submitted.value = false
}
</script>

<template>
  <UCard class="mt-10">
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <h3 class="font-semibold">
          Chapter quiz
        </h3>
        <UBadge
          v-if="isQuizPassed(chapterSlug)"
          color="primary"
          variant="subtle"
          label="Passed"
          icon="i-lucide-check"
        />
      </div>
    </template>

    <div class="space-y-8">
      <div
        v-for="(item, index) in questions"
        :key="index"
        class="space-y-3"
      >
        <p class="font-medium">
          {{ index + 1 }}. {{ item.question }}
        </p>

        <URadioGroup
          v-model="answers[index]"
          :items="item.options.map((label, optionIndex) => ({
            label,
            value: optionIndex
          }))"
          :disabled="submitted"
        />

        <UAlert
          v-if="submitted"
          :color="answers[index] === item.correctIndex ? 'primary' : 'warning'"
          variant="subtle"
          :title="answers[index] === item.correctIndex ? 'Correct' : 'Not quite'"
          :description="item.explanation"
        />
      </div>
    </div>

    <div class="mt-8 flex flex-wrap gap-3">
      <UButton
        v-if="!submitted"
        label="Check answers"
        icon="i-lucide-check-circle"
        :disabled="answers.some(answer => answer < 0)"
        @click="submit"
      />

      <UButton
        v-if="submitted && !passed"
        label="Try again"
        color="neutral"
        variant="outline"
        icon="i-lucide-rotate-ccw"
        @click="retry"
      />

      <UButton
        v-if="submitted && passed && nextChapter"
        :to="nextChapter"
        label="Next chapter"
        trailing-icon="i-lucide-arrow-right"
      />

      <UButton
        v-if="submitted && passed && !nextChapter"
        to="/learn"
        label="Course complete — back to chapters"
        trailing-icon="i-lucide-trophy"
      />

      <UButton
        v-if="submitted && passed && !nextChapter"
        to="/learn/glossary"
        label="Browse glossary"
        color="neutral"
        variant="outline"
        icon="i-lucide-book-marked"
      />
    </div>

    <UAlert
      v-if="submitted && passed"
      class="mt-6"
      icon="i-lucide-party-popper"
      color="primary"
      variant="subtle"
      :title="`Score: ${score}/${questions.length}`"
      :description="nextChapter
        ? 'Great work — you passed this chapter quiz.'
        : 'Congratulations — you completed the full course!'"
    />
  </UCard>
</template>
