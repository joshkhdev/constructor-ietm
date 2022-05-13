import { NestedTreeControl } from '@angular/cdk/tree';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SubSink } from 'subsink';
import { SceneService } from '../scene/services/scene.service';
import { TreeStructureI } from '../shared/models/treeStructure.interface';
import { TreeRenameComponent } from './components/tree-rename/tree-rename.component';
import { TreeStructureService } from './services/tree-structure.service';

@Component({
  selector: 'app-tree-structure',
  templateUrl: './tree-structure.component.html',
  styleUrls: ['./tree-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeStructureComponent implements OnInit {
  private subs = new SubSink();

  @Input() tree: TreeStructureI;
  @Input() viewMode: boolean;

  @Output() updateTree = new EventEmitter();

  treeControl = new NestedTreeControl((node: any) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeStructureI>();
  expandedNodes: any = [];

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  constructor(
    public sceneService: SceneService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private treeStructure: TreeStructureService,
  ) {}

  ngOnInit(): void {
    this.dataSource.data = [this.tree];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tree && !changes.tree.firstChange) {
      this.dataSource.data = [this.tree];
      this.dataSource.data.forEach((node: any) => {
        this.treeControl.expand(this.dataSource.data.find((n) => n.id === node.id));
      });
      this.cdr.detectChanges();
    }
  }

  objectIsHidden(name: string, hiddenObjects: any[]) {
    return hiddenObjects.some((obj) => obj.name === this.sceneService.replacedNameNode(name));
  }

  toggleObjectVisibility(node: any) {
    this.sceneService.toggleObjectVisibilityById(node.name);
  }

  fitToObject(node: any) {
    this.sceneService.fitToView(node.name, () => {});
  }

  renameElement(node: TreeStructureI) {
    const dialogRef = this.dialog.open(TreeRenameComponent, {
      data: { node: node },
    });
    this.subs.add(
      dialogRef.afterClosed().subscribe((result: TreeStructureI) => {
        if (result) {
          const treeNode = this.treeStructure.findNode(result, this.tree)!;
          treeNode.viewName = result.viewName;
          this.expandedNodes = [];
          this.dataSource.data.forEach((node: any) => {
            if (node.expandable && this.treeControl.isExpanded(node)) {
              this.expandedNodes.push(node);
            }
          });
          this.updateTree.emit(this.tree);
        }
      }),
    );
  }
}
