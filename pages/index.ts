import { DateTime } from 'luxon'

export default {
  asyncData: async ({ app }) => ({
    posts: await app.$content('/episode').query({ exclude: 'body' }).getAll()
  }),
  filters: {
    date (val: string) {
      return DateTime.fromSQL(val).toFormat('yyyy年MM月dd日')
    },
    join (array: string[], val: string) {
      return array.join(val)
    },
    desc (post: any): string {
      if (post.description !== null) return post.description

      const combinedActors = post.actor_ids.join('と')
      const postActors = 1 < post.actor_ids.length ? `の${post.actor_ids.length}人で` : 'が'

      const combinedTopics = post.topics.join('、')
      const postTopics = 1 < post.topics.length ? 'など' : ''

      return `${combinedActors}${postActors}、${combinedTopics}${postTopics}について話しました。`
    }
  }
}
