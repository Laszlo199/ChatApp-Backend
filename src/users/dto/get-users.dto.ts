export class GetUsersDto {
  id: number;
  username: string;
  status: string;
}

export enum FriendStatus {
  Friends = 'FRIENDS',
  InvitationSent = 'INVITATIONSENT',
  InvitationReceived = 'INVITATIONRECEIVED',
  None = 'NONE',
}
