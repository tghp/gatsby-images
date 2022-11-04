<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
if (getenv('LANDO_INFO')) {
    /**  Parse the LANDO INFO  */
    $lando_info = json_decode(getenv('LANDO_INFO'));

    /** Get the database config */
    $database_config = $lando_info->database;
    /** The name of the database for WordPress */
    define('DB_NAME', $database_config->creds->database);
    /** MySQL database username */
    define('DB_USER', $database_config->creds->user);
    /** MySQL database password */
    define('DB_PASSWORD', $database_config->creds->password);
    /** MySQL hostname */
    define('DB_HOST', $database_config->internal_connection->host);
}

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '9(%CL5-P-|Wh-JJQpzu>L}i3wepTV8R4x!nJ4hSA:`Ws+|48tkfM/_>hkXB*s9;>');
define('SECURE_AUTH_KEY',  'TKfoLPa<-9[r4XiQk9,[6[B{gvaAB)Z0tA}suc5R+UtW[~QTRQ/8oV0M0BX|-c!q');
define('LOGGED_IN_KEY',    'jAwG0D<-7HKHCn-Afd8U]Uu)Vz&2R,sZoemJq>T?p,n$t@=5wc)hr2T0[{>4SJj2');
define('NONCE_KEY',        'P@zjj-Ma}U/}3?JMyJ(aK(G+4VhuVsD-4WfRq;dM!NleN87^~$DFP$lUp]|[hG@V');
define('AUTH_SALT',        'QXzxnL&|yVcCAA`OQ-Gs]o-^^f+c6xs05pwI|aZ6TC$woe&DME<o |AeZ.<+$uOP');
define('SECURE_AUTH_SALT', '3@;XA>mb=FO|-D0@Zr 01+7@Ri3N6#pc4p6J$xmk1.~hSKt +fHRTeUuFcHz8V?[');
define('LOGGED_IN_SALT',   'Va4BS|%>|pU;a;^`eEFxiWVaFU0ln~tS8Yk{RpG?,xw<X 1H[ZPa~}i]shSk TX>');
define('NONCE_SALT',       'Pc+^Z0JR[+(0%3]Hxf%2CNO-j+SH.mEk?cXvcnL%nuLj{$-TqtI|<l~! HEBcy>M');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
