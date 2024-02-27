declare module "Config" {
	interface ConfigCache {
		[key: string]: any; // or replace 'any' with the actual type of the values in the cache
	}
}
