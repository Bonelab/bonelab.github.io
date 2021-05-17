<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'numerics_b2a' );

/** MySQL database username */
define( 'DB_USER', 'numerics_b2a' );

/** MySQL database password */
define( 'DB_PASSWORD', 'B5EDA4C17dkcwg0z8n3v6y9' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'aN73w1{&e7c*3>K8?F5xp>fh,W5,is l`mtaDQNFr?f7dj([{*q#o`k2qZBVrZk-' );
define( 'SECURE_AUTH_KEY',   'AxnxKw<FR%v_v%jo`/4] L)M2Q8%a_60.>lC//Nw`l1uqp&Ekh@f,%0hZz+_4<`M' );
define( 'LOGGED_IN_KEY',     ',<%-2a~x4CJ2l`GfC:drPZ:T:.W1&NX5dFi^@Ra@%]i(A}u#YKUyYgfcK)n8}aY0' );
define( 'NONCE_KEY',         '|MGqI `W(^+$?zz3AVsz$O+q M<{%r#ch#djfFngV+;n<,nx>oJ?j3g+-T*sh.oE' );
define( 'AUTH_SALT',         'OT#;c*-q4&GwrtPg%<&REUVWeRA5qx/2[X.0G4NO<cVerp$4wMg(qUa?u47/0x4%' );
define( 'SECURE_AUTH_SALT',  ';&R6<)kU#PEF%D%#):bq+n+.eYo]h:SE_z n0b8{yi9VFCftI,9DGvGVJ<gXC^h3' );
define( 'LOGGED_IN_SALT',    '4Ljy,5-T/b(k?0t_<9|_~e[o9c28i{S5hNF6gp?.V6H`YR)Dgf q2cF/Qpf<l.^9' );
define( 'NONCE_SALT',        'OG{QOw$t1H48*g=s4_zT3yZ%+zD$,-itW,4fiRUSYfM%e Z3gMS>8H[,5A:KS $|' );
define( 'WP_CACHE_KEY_SALT', 'ky&& !%i4$?ZoYvW:}=` o_)6q 7Z_IjBAc9jpwEZHbn?_!}FK`r>jnOq:1PF?n~' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'b2a_';



define( 'AUTOSAVE_INTERVAL',    300  );
define( 'WP_POST_REVISIONS',    5    );
define( 'EMPTY_TRASH_DAYS',     7    );
define( 'WP_AUTO_UPDATE_CORE',  true );
define( 'WP_CRON_LOCK_TIMEOUT', 120  );

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
