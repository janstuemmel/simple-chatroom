type ChatUser = {
  Id: string
  Name: string
}

type ChatMessage = {
  User: User
  Id: string
  Date: Date
  Text: string
}