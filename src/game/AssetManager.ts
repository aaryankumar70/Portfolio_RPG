// AssetManager.ts - Production Asset Preloader & Cache
// Manages loading and instant synchronous retrieval of PNG sprites, buildings, tilesets, and UI assets

export class AssetManager {
  private images: Map<string, HTMLImageElement> = new Map();
  private loadPromises: Map<string, Promise<HTMLImageElement>> = new Map();
  public isLoaded: boolean = false;
  public totalAssets: number = 0;
  public loadedAssets: number = 0;

  // List of all critical game assets to preload
  private manifest: string[] = [
    // Characters
    '/assets/characters/aryan/aryan_spritesheet.png',
    '/assets/characters/aryan/aryan_idle.png',
    '/assets/characters/aryan/aryan_walk.png',
    '/assets/characters/aryan/aryan_interact.png',
    '/assets/characters/aryan/aryan_celebrate.png',
    '/assets/characters/mango/mango_spritesheet.png',
    '/assets/characters/mango/mango_idle.png',
    '/assets/characters/mango/mango_walk.png',
    '/assets/characters/mango/mango_follow.png',
    '/assets/characters/mango/mango_sit.png',

    // Buildings (12 Locations)
    '/assets/buildings/coffee_shop.png',
    '/assets/buildings/guild_hall.png',
    '/assets/buildings/python_cave.png',
    '/assets/buildings/garden.png',
    '/assets/buildings/sql_mines.png',
    '/assets/buildings/blacksmith.png',
    '/assets/buildings/library.png',
    '/assets/buildings/home.png',
    '/assets/buildings/analytics_tower.png',
    '/assets/buildings/ml_laboratory.png',
    '/assets/buildings/boss_arena.png',
    '/assets/buildings/post_office.png',

    // Environment
    '/assets/environment/fountain.png',
    '/assets/environment/tree_oak.png',
    '/assets/environment/tree_pine.png',
    '/assets/environment/tree_cherry.png',
    '/assets/environment/tree_autumn.png',
    '/assets/environment/bench.png',
    '/assets/environment/lamp_post.png',
    '/assets/environment/flowers_patch.png',
    '/assets/environment/fence_horizontal.png',
    '/assets/environment/fence_vertical.png',
    '/assets/environment/fence_post.png',
    '/assets/environment/barrel.png',
    '/assets/environment/crate.png',
    '/assets/environment/crystal_cluster.png',
    '/assets/environment/crystal_blue.png',
    '/assets/environment/rock_large.png',
    '/assets/environment/rock_mossy.png',
    '/assets/environment/bush_01.png',
    '/assets/environment/bush_02.png',
    '/assets/environment/sign_post.png',

    // Tilesets
    '/assets/tilesets/grass_01.png',
    '/assets/tilesets/grass_02.png',
    '/assets/tilesets/grass_03.png',
    '/assets/tilesets/flower_grass_01.png',
    '/assets/tilesets/flower_grass_02.png',
    '/assets/tilesets/cobblestone.png',
    '/assets/tilesets/dirt.png',
    '/assets/tilesets/stone.png',
    '/assets/tilesets/water_01.png',
    '/assets/tilesets/water_02.png',
    '/assets/tilesets/water_03.png',
    '/assets/tilesets/wood_floor.png',
    '/assets/tilesets/terrain_tileset.png',

    // NPCs
    '/assets/npcs/barista_idle.png',
    '/assets/npcs/barista.png',
    '/assets/npcs/gardener_idle.png',
    '/assets/npcs/gardener.png',
    '/assets/npcs/blacksmith_idle.png',
    '/assets/npcs/blacksmith.png',
    '/assets/npcs/data_sage_idle.png',
    '/assets/npcs/data_sage.png',
    '/assets/npcs/guild_master_idle.png',
    '/assets/npcs/guild_master.png',
    '/assets/npcs/librarian_idle.png',
    '/assets/npcs/librarian.png',
    '/assets/npcs/ai_companion_idle.png',
    '/assets/npcs/ai_companion.png',
    '/assets/npcs/postmaster_idle.png',
    '/assets/npcs/postmaster.png',

    // UI & Portraits
    '/assets/ui/portrait_aryan.png',
    '/assets/ui/portrait_mango.png',
    '/assets/ui/portrait_ai_companion.png',
    '/assets/ui/portrait_data_sage.png',
    '/assets/ui/dialogue_panel.png',
    '/assets/ui/bar_frame.png',
    '/assets/ui/hp_bar_fill.png',
    '/assets/ui/xp_bar_fill.png',
    '/assets/ui/button_normal.png',
    '/assets/ui/button_hover.png',
    '/assets/ui/button_pressed.png',
    '/assets/ui/heart_full.png',
    '/assets/ui/heart_half.png',
    '/assets/ui/heart_empty.png',
    '/assets/ui/icon_skill_python.png',
    '/assets/ui/icon_skill_sql.png',
    '/assets/ui/icon_skill_ml.png',
    '/assets/ui/icon_skill_analytics.png',
    '/assets/ui/icon_skill_swords.png'
  ];

  constructor() {
    this.totalAssets = this.manifest.length;
    this.preloadAll();
  }

  // Preloads all manifest assets asynchronously
  public preloadAll(): Promise<void> {
    const promises = this.manifest.map((src) => this.loadImage(src));
    return Promise.all(promises).then(() => {
      this.isLoaded = true;
    }).catch((err) => {
      console.warn('Some game assets could not load, using procedural fallbacks', err);
      this.isLoaded = true;
    });
  }

  // Load a single image with caching
  public loadImage(src: string): Promise<HTMLImageElement> {
    if (this.loadPromises.has(src)) {
      return this.loadPromises.get(src)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(src, img);
        this.loadedAssets++;
        resolve(img);
      };
      img.onerror = () => {
        // Resolve anyway so Promise.all doesn't fail, fallback will be used
        console.warn(`Failed to load asset: ${src}`);
        resolve(img);
      };
      img.src = src;
    });

    this.loadPromises.set(src, promise);
    return promise;
  }

  // Synchronous retrieval during 60 FPS animation loop
  public getImage(src: string): HTMLImageElement | null {
    const img = this.images.get(src);
    if (img && img.complete && img.naturalWidth > 0) {
      return img;
    }
    // If not yet loaded or triggered, trigger load in background
    if (!this.loadPromises.has(src)) {
      this.loadImage(src);
    }
    return null;
  }
}

export const assetManager = new AssetManager();
