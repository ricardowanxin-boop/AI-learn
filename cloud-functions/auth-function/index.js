'use strict'

const DEFAULT_KEYS = ['AGENT2026-ABC123', 'AGENT2026-DEMO01']

function parseBody(event) {
  if (!event) return {}
  if (typeof event.body === 'string') {
    try {
      return JSON.parse(event.body || '{}')
    } catch (error) {
      return {}
    }
  }
  return event.body || event
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
    body: JSON.stringify(payload),
  }
}

function getAllowedKeys() {
  const raw = process.env.ACCESS_KEYS || ''
  const keys = raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return keys.length > 0 ? keys : DEFAULT_KEYS
}

function maskKey(key) {
  if (!key || key.length < 8) return key || ''
  return `${key.slice(0, 8)}****${key.slice(-3)}`
}

exports.main = async (event) => {
  if (event?.httpMethod === 'OPTIONS' || event?.requestContext?.http?.method === 'OPTIONS') {
    return jsonResponse(200, { success: true })
  }

  const body = parseBody(event)
  const key = String(body.key || body.cardKey || '').trim().toUpperCase()
  const deviceId = String(body.deviceId || '').trim()
  const allowedKeys = getAllowedKeys()

  if (!key) {
    return jsonResponse(400, {
      success: false,
      code: 'KEY_REQUIRED',
      message: '请输入卡密',
    })
  }

  if (!deviceId) {
    return jsonResponse(400, {
      success: false,
      code: 'DEVICE_REQUIRED',
      message: '缺少设备标识',
    })
  }

  if (!allowedKeys.includes(key)) {
    return jsonResponse(401, {
      success: false,
      code: 'INVALID_KEY',
      message: '卡密不存在或已失效，无法登录',
    })
  }

  const tokenPayload = {
    key: maskKey(key),
    deviceId,
    scope: 'agent-studio-all-access',
    issuedAt: Date.now(),
  }

  return jsonResponse(200, {
    success: true,
    code: 'OK',
    message: '登录成功',
    token: Buffer.from(JSON.stringify(tokenPayload)).toString('base64url'),
    expiresIn: 30 * 24 * 60 * 60,
    user: {
      name: '学习者_001',
      plan: '资料通行证',
    },
  })
}
