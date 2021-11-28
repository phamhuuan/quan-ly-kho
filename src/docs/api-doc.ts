/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication api
 */

/**
 * @swagger
 * /api/authentication/login:
 *   post:
 *     description: Login via email and password
 *     tags: [Authentication]
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: 'abc@example.com'
 *             password: '12345678'
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 token:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                   nullable: true
 *       400:
 *         description: Please provide email and password
 *       404:
 *         description: User not found
 *       403:
 *         description: Wrong password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/authentication/logout:
 *   delete:
 *     description: Logout
 *     tags: [Authentication]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: Bearer + ' ' + accessToken
 *         required: true
 *     responses:
 *       200:
 *         description: Logout successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
