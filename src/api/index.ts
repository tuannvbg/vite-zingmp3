import axios from 'axios'

export enum ApiStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export * from './useApi'

const request = axios.create({
  baseURL: (import.meta.env.VITE_BASE_URL as string) || 'http://localhost:8080',
  timeout: 5000,
})

request.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export function fetchPlaylist(id: string) {
  return request({
    url: 'api/playlist/getDetail?id=' + id,
  })
}

export function fetchStreaming(id: string, isWorldWide = true) {
  if (isWorldWide) {
    return request({
      url: 'api/song/streaming?id=' + id,
    })
  } else {
    return request({
      url: 'api/song/streamingproxy?id=' + id,
    })
  }
}

export function fetchHome(page = 1) {
  return request({
    url: 'api/home?page=' + page,
  })
}

export function fetchSongInfo(id: string) {
  return request({
    url: 'api/song/info?id=' + id,
  })
}

export function fetchSongList(id: string) {
  return request({
    url: 'api/song/list?id=' + id,
  })
}

export function fetchLyric(id: string) {
  return request({
    url: 'api/lyric?id=' + id,
  })
}

export function fetchKaraokeLyric(link: string) {
  return request({
    url: link,
  })
}

export default request
