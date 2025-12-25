import { test, expect } from "@playwright/test";

test.describe("ポモドーロタイマー", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("ページが正しく表示される", async ({ page }) => {
    // タイトルの確認
    await expect(
      page.getByRole("heading", { name: "ポモドーロタイマー" }),
    ).toBeVisible();

    // ボタンの表示確認
    await expect(page.getByRole("button", { name: "スタート" })).toBeVisible();
    await expect(page.getByRole("button", { name: "リセット" })).toBeVisible();

    // セレクトボックスの確認
    await expect(page.locator("#focus-time")).toBeVisible();
    await expect(page.locator("#rest-time")).toBeVisible();
  });

  test("タイマーの初期値が正しく表示される", async ({ page }) => {
    // 集中時間のデフォルト値（25分）を確認
    const focusTimerText = await page
      .locator("text=集中する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(focusTimerText).toBe("25:00");

    // 休憩時間のデフォルト値（5分）を確認
    const restTimerText = await page
      .locator("text=休憩する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(restTimerText).toBe("05:00");
  });

  test("セレクトボックスでタイマー値を変更できる", async ({ page }) => {
    // 集中時間を15分に変更
    await page.locator("#focus-time").selectOption("900");
    const focusTimerText = await page
      .locator("text=集中する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(focusTimerText).toBe("15:00");

    // 休憩時間を10分に変更
    await page.locator("#rest-time").selectOption("600");
    const restTimerText = await page
      .locator("text=休憩する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(restTimerText).toBe("10:00");
  });

  test("スタートボタンでタイマーが動作する", async ({ page }) => {
    // タイマーの時刻を固定
    await page.clock.install({ time: new Date("2024-01-01T00:00:00") });

    // スタートボタンをクリック
    await page.getByRole("button", { name: "スタート" }).click();

    // ストップボタンが表示されることを確認
    await expect(page.getByRole("button", { name: "ストップ" })).toBeVisible();

    // 5秒進める
    await page.clock.fastForward(5000);

    // タイマーが減少していることを確認（25:00 → 24:55）
    const focusTimerText = await page
      .locator("text=集中する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(focusTimerText).toBe("24:55");
  });

  test("ストップボタンでタイマーを停止できる", async ({ page }) => {
    await page.clock.install({ time: new Date("2024-01-01T00:00:00") });

    // スタート
    await page.getByRole("button", { name: "スタート" }).click();

    // 3秒進める
    await page.clock.fastForward(3000);

    // ストップボタンをクリック
    await page.getByRole("button", { name: "ストップ" }).click();

    // スタートボタンが再表示されることを確認
    await expect(page.getByRole("button", { name: "スタート" })).toBeVisible();

    const focusTimerText = await page
      .locator("text=集中する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(focusTimerText).toBe("24:57");

    // さらに時間を進めてもタイマーが止まっていることを確認
    await page.clock.fastForward(5000);
    const stillSameTime = await page
      .locator("text=集中する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(stillSameTime).toBe("24:57");
  });

  test("リセットボタンでタイマーが初期値に戻る", async ({ page }) => {
    await page.clock.install({ time: new Date("2024-01-01T00:00:00") });

    // スタートしてタイマーを動かす
    await page.getByRole("button", { name: "スタート" }).click();
    await page.clock.fastForward(10000);

    // リセットボタンをクリック
    await page.getByRole("button", { name: "リセット" }).click();

    // タイマーが初期値に戻ることを確認
    const focusTimerText = await page
      .locator("text=集中する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(focusTimerText).toBe("25:00");

    const restTimerText = await page
      .locator("text=休憩する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(restTimerText).toBe("05:00");

    // スタートボタンが表示されることを確認
    await expect(page.getByRole("button", { name: "スタート" })).toBeVisible();
  });

  test("集中時間が終わると自動的に休憩時間に切り替わる", async ({ page }) => {
    await page.clock.install({ time: new Date("2024-01-01T00:00:00") });

    // 短い集中時間に設定（15分）
    await page.locator("#focus-time").selectOption("900");

    // スタート
    await page.getByRole("button", { name: "スタート" }).click();

    // 集中時間の境界線が緑色になっていることを確認（アクティブ状態）
    const focusTimer = page.locator("text=集中する時間").locator("..");
    await expect(focusTimer).toHaveClass(/border-green-500/);

    // 15分（900秒）経過させる
    await page.clock.fastForward(900000);

    // 休憩時間に切り替わり、休憩タイマーがアクティブになることを確認
    const restTimer = page.locator("text=休憩する時間").locator("..");
    await expect(restTimer).toHaveClass(/border-green-500/);

    // 休憩時間が動き始めることを確認（5秒進める）
    await page.clock.fastForward(5000);
    const restTimerText = await page
      .locator("text=休憩する時間")
      .locator("..")
      .locator("div.text-6xl")
      .textContent();
    expect(restTimerText).toBe("04:55");
  });
});
