#!/usr/bin/env python3
"""
内容整理脚本 - Agent时代教程知识库
功能：
1. 扫描创业文件夹，提取所有markdown和文档
2. 按主题自动分类
3. 生成知识地图
4. 识别重复和缺失内容
5. 输出整理建议
"""

import os
import re
from pathlib import Path
from collections import defaultdict
import json
from datetime import datetime

# 配置
SOURCE_DIR = "/Users/ricardo/文稿/创业"
OUTPUT_DIR = "/Users/ricardo/文稿/创业/产品/agent时代教程"
EXCLUDE_DIRS = {'.git', 'node_modules', 'build', 'dist', '.DS_Store', '__pycache__'}

# 主题分类关键词
CATEGORIES = {
    'iOS开发': ['ios', 'swift', 'xcode', 'app store', 'swiftui', 'uikit', 'widget'],
    'AI技能流': ['claude', 'codex', 'cursor', 'agent', 'prompt', 'skill', 'ai工作'],
    'Web开发': ['vue', 'react', 'next', 'web', 'html', 'css', 'javascript', 'typescript'],
    '自动化工具': ['自动化', 'automation', 'script', '脚本', 'workflow'],
    '商业项目': ['商业', '业务', '方案', '需求', '产品'],
    '设计资源': ['ui', 'figma', '设计', 'design'],
    '部署运维': ['deploy', '部署', 'docker', 'server', '云服务'],
    '电商相关': ['电商', '小红书', '自媒体', '内容'],
}

class ContentOrganizer:
    def __init__(self):
        self.files_by_category = defaultdict(list)
        self.all_files = []
        self.stats = {
            'total_files': 0,
            'markdown_files': 0,
            'code_files': 0,
            'total_size': 0
        }

    def scan_directory(self):
        """扫描目录，收集所有相关文件"""
        print(f"🔍 开始扫描: {SOURCE_DIR}")

        for root, dirs, files in os.walk(SOURCE_DIR):
            # 排除不需要的目录
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

            for file in files:
                if file.startswith('.'):
                    continue

                file_path = Path(root) / file
                ext = file_path.suffix.lower()

                # 只处理文档和代码文件
                if ext in ['.md', '.txt', '.pdf', '.doc', '.docx', '.py', '.js', '.ts', '.swift']:
                    self.all_files.append(file_path)
                    self.stats['total_files'] += 1

                    if ext == '.md':
                        self.stats['markdown_files'] += 1
                    elif ext in ['.py', '.js', '.ts', '.swift']:
                        self.stats['code_files'] += 1

                    try:
                        self.stats['total_size'] += file_path.stat().st_size
                    except:
                        pass

        print(f"✅ 扫描完成: 找到 {self.stats['total_files']} 个文件")

    def categorize_files(self):
        """根据关键词对文件进行分类"""
        print("\n📂 开始分类...")

        for file_path in self.all_files:
            file_str = str(file_path).lower()
            matched = False

            # 尝试读取文件内容（仅markdown）
            content = ""
            if file_path.suffix == '.md':
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()[:1000].lower()  # 只读前1000字符
                except:
                    pass

            # 匹配分类
            for category, keywords in CATEGORIES.items():
                for keyword in keywords:
                    if keyword in file_str or keyword in content:
                        self.files_by_category[category].append({
                            'path': str(file_path),
                            'name': file_path.name,
                            'relative_path': str(file_path.relative_to(SOURCE_DIR)),
                            'size': file_path.stat().st_size if file_path.exists() else 0
                        })
                        matched = True
                        break
                if matched:
                    break

            # 未匹配的放入"其他"
            if not matched:
                self.files_by_category['其他'].append({
                    'path': str(file_path),
                    'name': file_path.name,
                    'relative_path': str(file_path.relative_to(SOURCE_DIR)),
                    'size': file_path.stat().st_size if file_path.exists() else 0
                })

        print("✅ 分类完成")

    def generate_knowledge_map(self):
        """生成知识地图"""
        print("\n🗺️  生成知识地图...")

        map_content = "# Agent时代教程 - 知识地图\n\n"
        map_content += f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
        map_content += "## 📊 统计概览\n\n"
        map_content += f"- 总文件数: {self.stats['total_files']}\n"
        map_content += f"- Markdown文档: {self.stats['markdown_files']}\n"
        map_content += f"- 代码文件: {self.stats['code_files']}\n"
        map_content += f"- 总大小: {self.stats['total_size'] / 1024 / 1024:.2f} MB\n\n"

        map_content += "## 📚 内容分类\n\n"

        for category, files in sorted(self.files_by_category.items(), key=lambda x: len(x[1]), reverse=True):
            map_content += f"### {category} ({len(files)} 个文件)\n\n"

            # 按目录分组
            by_dir = defaultdict(list)
            for file in files:
                dir_name = Path(file['relative_path']).parent
                by_dir[str(dir_name)].append(file)

            for dir_name, dir_files in sorted(by_dir.items()):
                if len(dir_files) > 0:
                    map_content += f"#### 📁 {dir_name}\n\n"
                    for file in sorted(dir_files, key=lambda x: x['name'])[:10]:  # 最多显示10个
                        map_content += f"- `{file['name']}`\n"
                    if len(dir_files) > 10:
                        map_content += f"- ... 还有 {len(dir_files) - 10} 个文件\n"
                    map_content += "\n"

        # 保存知识地图
        output_path = Path(OUTPUT_DIR) / "知识地图.md"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(map_content)

        print(f"✅ 知识地图已保存: {output_path}")

    def generate_content_structure(self):
        """生成推荐的内容结构"""
        print("\n📋 生成内容结构建议...")

        structure = {
            "guide": {
                "title": "入门指南",
                "source_categories": ["AI技能流"],
                "priority": "high",
                "files": []
            },
            "ios-development": {
                "title": "iOS开发实战",
                "source_categories": ["iOS开发"],
                "priority": "high",
                "files": []
            },
            "ai-skills": {
                "title": "AI技能流",
                "source_categories": ["AI技能流"],
                "priority": "high",
                "files": []
            },
            "web-development": {
                "title": "Web开发",
                "source_categories": ["Web开发"],
                "priority": "medium",
                "files": []
            },
            "automation": {
                "title": "自动化工具",
                "source_categories": ["自动化工具"],
                "priority": "medium",
                "files": []
            },
            "real-projects": {
                "title": "真实项目案例",
                "source_categories": ["商业项目"],
                "priority": "high",
                "files": []
            },
            "design": {
                "title": "设计资源",
                "source_categories": ["设计资源"],
                "priority": "low",
                "files": []
            }
        }

        # 填充文件
        for section_key, section_info in structure.items():
            for category in section_info["source_categories"]:
                if category in self.files_by_category:
                    section_info["files"].extend(self.files_by_category[category])

        # 生成结构文档
        structure_content = "# 内容结构建议\n\n"
        structure_content += "## 📖 推荐的教程结构\n\n"

        for section_key, section_info in structure.items():
            structure_content += f"### {section_info['title']}\n\n"
            structure_content += f"- 优先级: {section_info['priority']}\n"
            structure_content += f"- 来源分类: {', '.join(section_info['source_categories'])}\n"
            structure_content += f"- 可用文件: {len(section_info['files'])} 个\n\n"

            # 列出部分关键文件
            md_files = [f for f in section_info['files'] if f['name'].endswith('.md')]
            if md_files:
                structure_content += "**关键文档:**\n\n"
                for file in md_files[:5]:
                    structure_content += f"- {file['name']}\n"
                structure_content += "\n"

        # 保存结构建议
        output_path = Path(OUTPUT_DIR) / "内容结构建议.md"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(structure_content)

        print(f"✅ 内容结构建议已保存: {output_path}")

        # 保存JSON格式（方便程序读取）
        json_path = Path(OUTPUT_DIR) / "content-structure.json"
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(structure, f, ensure_ascii=False, indent=2)

        print(f"✅ JSON结构已保存: {json_path}")

    def generate_todo_list(self):
        """生成待办清单"""
        print("\n✅ 生成待办清单...")

        todo_content = "# 内容整理待办清单\n\n"
        todo_content += f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"

        todo_content += "## 🎯 优先级任务\n\n"
        todo_content += "### P0 - 本周完成\n\n"
        todo_content += "- [ ] 整理AI工作技能流核心文档\n"
        todo_content += "- [ ] 提取4个iOS应用的开发经验\n"
        todo_content += "- [ ] 编写入门指南\n"
        todo_content += "- [ ] 搭建VitePress框架\n\n"

        todo_content += "### P1 - 下周完成\n\n"
        todo_content += "- [ ] 整理真实项目案例\n"
        todo_content += "- [ ] 编写技能包使用教程\n"
        todo_content += "- [ ] 准备代码模板\n"
        todo_content += "- [ ] 设计付费内容结构\n\n"

        todo_content += "### P2 - 后续完成\n\n"
        todo_content += "- [ ] 录制视频教程\n"
        todo_content += "- [ ] 建立社群\n"
        todo_content += "- [ ] 接入支付系统\n"
        todo_content += "- [ ] SEO优化\n\n"

        todo_content += "## 📝 内容补充建议\n\n"

        # 分析缺失的内容
        todo_content += "### 需要补充的内容\n\n"
        todo_content += "1. **快速开始指南** - 让新手5分钟上手\n"
        todo_content += "2. **工具安装教程** - Claude/Cursor/Xcode配置\n"
        todo_content += "3. **常见问题FAQ** - 收集用户痛点\n"
        todo_content += "4. **案例视频** - 实操演示\n"
        todo_content += "5. **资源下载页** - 模板、技能包、代码\n\n"

        todo_content += "## 🔄 内容优化建议\n\n"
        todo_content += "1. 统一文档格式和风格\n"
        todo_content += "2. 添加代码示例和截图\n"
        todo_content += "3. 补充实战经验和踩坑记录\n"
        todo_content += "4. 建立内容之间的关联\n"
        todo_content += "5. 添加难度标签和学习路径\n\n"

        # 保存待办清单
        output_path = Path(OUTPUT_DIR) / "待办清单.md"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(todo_content)

        print(f"✅ 待办清单已保存: {output_path}")

    def run(self):
        """运行完整流程"""
        print("=" * 60)
        print("🚀 Agent时代教程 - 内容整理工具")
        print("=" * 60)

        # 确保输出目录存在
        Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)

        # 执行各个步骤
        self.scan_directory()
        self.categorize_files()
        self.generate_knowledge_map()
        self.generate_content_structure()
        self.generate_todo_list()

        print("\n" + "=" * 60)
        print("✨ 完成！所有文件已保存到:")
        print(f"   {OUTPUT_DIR}")
        print("=" * 60)
        print("\n📋 生成的文件:")
        print("   - 知识地图.md")
        print("   - 内容结构建议.md")
        print("   - content-structure.json")
        print("   - 待办清单.md")
        print("\n💡 下一步:")
        print("   1. 查看知识地图，了解现有资产")
        print("   2. 根据内容结构建议，开始迁移内容")
        print("   3. 按照待办清单，逐步完成")

if __name__ == "__main__":
    organizer = ContentOrganizer()
    organizer.run()
