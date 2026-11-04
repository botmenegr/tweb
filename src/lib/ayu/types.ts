import type {MessageEntity} from '@layer';

/**
 * The AyuGram-style switches (Settings → Experimental → Ghost mode and saving). They live in the app settings
 * (`StateSettings.ayu`), so the worker, which holds the managers, reads the same values the page writes.
 */
export type AyuSettings = {
  /** Never tell the sender a message was read (chats, threads, channels, voice/video played) */
  ghostRead: boolean,
  /** Never show "typing…", "recording…" and the like */
  ghostTyping: boolean,
  /** Never go online: the status stays "offline" */
  ghostOnline: boolean,
  /** Watching stories does not mark them as viewed */
  ghostStories: boolean,
  /** No sponsored messages */
  hideSponsored: boolean,
  /** A message deleted by someone else stays in the chat with a mark */
  saveDeleted: boolean,
  /** The previous texts of an edited message are kept */
  saveEdits: boolean
};

export const AYU_DEFAULTS: AyuSettings = {
  ghostRead: false,
  ghostTyping: false,
  ghostOnline: false,
  ghostStories: false,
  hideSponsored: false,
  saveDeleted: true,
  saveEdits: true
};

export type AyuEditVersion = {
  /** When this text was the current one: its last edit, or the send time */
  date: number,
  message: string,
  entities?: MessageEntity[]
};

/** Fields this client adds to a message it keeps in its own storage */
export type AyuMessageFields = {
  ayuDeleted?: boolean,
  ayuEdits?: AyuEditVersion[]
};

/** A deletion update the client itself made up (see `ApiUpdatesManager.processUpdate`) */
export type AyuLocalUpdate = {ayuLocal?: boolean};
