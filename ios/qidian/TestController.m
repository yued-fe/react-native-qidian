//
//  TestController.m
//  qidian
//
//  Created by 周文康 on 2017/6/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "TestController.h"
#import "RNView.h"

#import "AppDelegate.h"

#define SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
#define SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height


@interface TestController ()

@end

@implementation TestController

- (void)viewWillAppear:(BOOL)animated{
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [app.nav setNavigationBarHidden:NO animated:animated];
  [super viewWillAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated{
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [app.nav setNavigationBarHidden:YES animated:animated];
  [super viewWillDisappear:animated];
}

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.navigationItem.title = @"我是原生页面哟~";
  
  self.view.backgroundColor = [UIColor whiteColor];
  
  
  UIButton *button = [UIButton buttonWithType:(UIButtonTypeCustom)];
  button.frame = CGRectMake(SCREEN_WIDTH / 2 - 150, 80, 300, 80);
  button.backgroundColor = [UIColor redColor];
  [button setTitle:@"点击我，跳转到React-Native页面" forState:(UIControlStateNormal)];
  [button addTarget:self action:@selector(click) forControlEvents:(UIControlEventTouchUpInside)];
  [self.view addSubview:button];
  
}

- (void)click{
  
  RNView *rn = [[RNView alloc]init];
  [self.navigationController pushViewController:rn animated:YES];
}


@end
