/// <reference types="node" />
/// <reference types="node" />
import { AppendOptions } from "form-data";
import { ReadStream } from "fs";
export interface DiscordObject {
    id: string;
}
export interface DiscordUser extends DiscordObject {
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
}
interface DiscordEmbedLinkedComponent {
    url?: string;
}
interface DiscordEmbedLinkedMediaContent extends DiscordEmbedLinkedComponent {
    proxy_url?: string;
    height?: number;
    width?: number;
}
export interface DiscordEmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface DiscordEmbedImage extends DiscordEmbedLinkedMediaContent {
}
export interface DiscordEmbedThumbnail extends DiscordEmbedLinkedMediaContent {
}
export interface DiscordEmbedVideo extends DiscordEmbedLinkedMediaContent {
}
export interface DiscordEmbedProvider extends DiscordEmbedLinkedComponent {
    name?: string;
}
export interface DiscordEmbedAuthor extends DiscordEmbedLinkedComponent {
    name?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface DiscordEmbedFields {
    name: string;
    value: string;
    inline?: boolean;
}
export declare const DiscordEmbedType: {
    readonly rich: "rich";
    readonly image: "image";
    readonly video: "video";
    readonly gifv: "gifv";
    readonly article: "article";
    readonly link: "link";
};
export type DiscordEmbedType = typeof DiscordEmbedType[keyof typeof DiscordEmbedType];
export interface DiscordAllowedMentions {
    parse?: AllowedMentionTypes[];
    roles?: string[];
    users?: string[];
    replied_user?: boolean;
}
export type AllowedMentionTypes = "roles" | "users" | "everyone";
export type DiscordButtonsComponentType = {
    type: DiscordEmbedComponentType;
    custom_id?: string;
    disabled?: boolean;
    style?: number;
    label?: string;
    emoji?: DiscordEmoji;
    url?: string;
};
export type DiscordSelectMenusComponentType = {
    type: DiscordEmbedComponentType;
    custom_id?: string;
    disabled?: boolean;
    options: SelectOptions[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
};
export type DiscordActionRowsComponentType = {
    type: DiscordEmbedComponentType;
    components?: DiscordComponent[];
};
export type DiscordComponent = DiscordButtonsComponentType | DiscordSelectMenusComponentType | DiscordActionRowsComponentType;
export declare const DiscordEmbedComponentType: {
    readonly Action_Row: 1;
    readonly Button: 2;
    readonly Select_Menu: 3;
};
export type DiscordEmbedComponentType = typeof DiscordEmbedComponentType[keyof typeof DiscordEmbedComponentType];
export interface SelectOptions {
    label: string;
    value: string;
    description?: string;
    emoji?: DiscordEmoji;
    default?: boolean;
}
export interface DiscordEmoji {
    id: string | null;
    name: string | null;
    roles?: DiscordRoles[];
    user?: DiscordUser;
    require_colons?: boolean;
    managed?: boolean;
    animatd?: boolean;
    available?: boolean;
}
export interface DiscordRoles {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    managed: boolean;
    mentionalbe: boolean;
    tags?: DiscordRoleTags;
}
export interface DiscordRoleTags {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
}
export interface DiscordEmbed {
    title?: string;
    type: DiscordEmbedType;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: DiscordEmbedFooter;
    image?: DiscordEmbedImage;
    thumbnail?: DiscordEmbedThumbnail;
    video?: DiscordEmbedVideo;
    provider?: DiscordEmbedProvider;
    author?: DiscordEmbedAuthor;
    fields?: DiscordEmbedFields[];
}
export interface SendDiscordWebhookMessage {
    content: string;
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    files?: Attachment[];
    embeds?: DiscordEmbed[];
    payload_json?: string;
    allowed_mentions?: DiscordAllowedMentions;
    components?: DiscordComponent[];
}
export declare class Embded implements DiscordEmbed {
    type: DiscordEmbedType;
    title?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: DiscordEmbedFooter;
    image?: DiscordEmbedImage;
    thumbnail?: DiscordEmbedThumbnail;
    video?: DiscordEmbedVideo;
    provider?: DiscordEmbedProvider;
    author?: DiscordEmbedAuthor;
    fields: DiscordEmbedFields[];
    constructor(opts: Partial<DiscordEmbed>);
}
export declare class Attachment {
    input: string | ReadStream | Buffer;
    options?: string | AppendOptions;
    constructor(input: string | ReadStream | Buffer, opt?: string | AppendOptions);
}
export declare class WebHook {
    url: string;
    constructor(webhook_url: string);
    sendMessage(msg: Partial<SendDiscordWebhookMessage>, max_retry?: number): Promise<object>;
}
export {};
