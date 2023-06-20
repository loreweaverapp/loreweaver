import {createEmotionCache} from "@mantine/core";
import {createStylesServer} from "@mantine/ssr";

export const emotionCache = createEmotionCache({
    key: "loreweaver",
    prepend: true,
    speedy: false, // !!!!!!!VERY IMPORTANT, DO NOT REMOVE. WILL BREAK PRODUCTION BUILD!!!!!!!
});

export const emotionStylesServer = createStylesServer(emotionCache);
