import { DateTime } from 'luxon'
import { mapState } from 'vuex'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'

export default {
  computed: {
    ...mapState([ 'actors' ]),
    episodes () {
      return this.$store.getters.filteredEpisodes.map((episode) => ({
        ...episode,
        actors: episode.actorIds.map((actorId) => this.actorsMap[actorId])
      }))
    },
    actorsMap () {
      return this.actors.reduce((map, actor) => ({ ...map, [actor.actorId]: actor }), {})
    }
  },
  filters: {
    date (episode) {
      return DateTime.fromMillis(episode.published).toFormat('yyyy年MM月dd日')
    },
    desc (episode): string {
      return EpisodeHelper.desc(episode)
    }
  },
  methods: {
    removeQuery (i) {
      const queries = this.$store.state.queries.slice()
      queries.splice(i, 1)
      this.$store.commit('searchText', queries.join(' '))
    }
  },
  destroyed () {
    this.$store.commit('searchText', '')
  },
  head () {
    return {
      title: 'Episode list'
    }
  }
}
